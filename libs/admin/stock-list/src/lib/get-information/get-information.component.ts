import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProfileService } from '@grillo-software/service';
import { createChart } from 'lightweight-charts';
import { forkJoin } from 'rxjs';
import { ForexSymbolService } from '../data-access/forex-symbol.service';

export interface SymbolData {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
  symbolChange: string;
}

export interface Profile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

@Component({
  selector: 'grillo-software-get-information',
  templateUrl: './get-information.component.html',
  styleUrls: ['./get-information.component.scss'],
})
export class GetInformationComponent implements OnChanges, OnInit {
  @Input() symbol: any;

  public profiles = [];

  constructor(
    private profileService: ProfileService,
    private forexService: ForexSymbolService
  ) {}

  ngOnInit() {}

  /**
   * Escucha los eventos de cambio emitidos por el componente padre
   * @param values Objto con nuevo valor obtemnido del padre
   */
  ngOnChanges(values: any): void {
    if (values.symbol.currentValue !== undefined) {
      this.getProfile(values.symbol.currentValue);
    }
  }

  /**
   * Obtiene el perfil basico de la compañia
   * @param symbol simbolo
   */
  private getProfile(symbolData: SymbolData): void {
    let withEquivalent = false;
    if (symbolData.type === 'ETP') {
      // No deja pasar acciones de tipo ETP
      // sin equivalencia
      this.profileService
        .saveWithoutProfile(symbolData.symbol, symbolData)
        .then((resp) => {
          console.log('guardado ETP', symbolData.symbol, resp);
        });
    } else {
      this.profileService.equivalentProfiles.forEach((element: any) => {
        // Busca equivalencia
        if (element.payload.doc.id === symbolData.symbol) {
          symbolData.symbolChange = element.payload.doc.data().symbolChange; // sustituye equivalencia
          withEquivalent = true;
          console.log('------sustitucion', symbolData.symbolChange);
        }
      });
      this.profileService.completeProfile(symbolData).subscribe(
        (resp: any) => {
          if (resp !== null) {
            forkJoin([
              this.profileService.candles(resp.ticker, 'W'),
              this.profileService.financials(resp.ticker),
            ]).subscribe(
              (resultArr: any) => {
                // console.log(resultArr[0]);
                resp.candles = { w: resultArr[0] }; //Respuesta de servicio de candles
                // console.log(resultArr[1]);
                resp.metric = resultArr[1].metric; //Respuesta de servicio de financials
                this.profileService.save(resp.symbol, resp).then((x) => {
                  console.log('guardado', resp.symbolChange, x);
                  this.profiles.push(resp);
                });
                // elimina sin perfil si se encuantra en la lista
                this.profileService
                  .deleteWithoutProfile(symbolData.symbol)
                  .then((y) => {
                    console.log('eliminado sin perfil', resp.symbolChange, y);
                  });
              },
              (error) => console.log('Error en algun paso de join' + error)
            );
          } else {
            if (withEquivalent) {
              // Elimina la equivalencio si no se encuentra el perfil
              this.profileService
                .deleteEquivalentProfile(symbolData.symbol)
                .then((z) => {
                  console.log('eliminado equivalente', symbolData.symbol, z);
                });
            } else {
              // Guarda en lista sin perfil y posible equivalencia
              this.profileService
                .saveWithoutProfile(symbolData.symbol, symbolData)
                .then((x) => {
                  console.log(
                    'guardado sin profile',
                    symbolData.symbolChange,
                    x
                  );
                });
              const equivalent = symbolData.symbolChange.split('.'); // Se pretende Eliminar la parte de .MX del symbol
              symbolData.symbolChange = equivalent[0];
              this.profileService
                .saveEquivalentProfile(symbolData.symbol, symbolData)
                .then((y) => {
                  console.log(
                    'guardado equivalente',
                    symbolData.symbolChange,
                    y
                  );
                });
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  graph(ticker: string, response: any) {
    const chart = createChart(ticker, { width: 850, height: 150 });
    const candlestickSeries = chart.addCandlestickSeries();
    const data = [];

    for (let index = 0; index < response.o.length; index++) {
      const unix = response.t[index] * 1000;
      const time = new Date(unix);
      const point = {
        time:
          time.getFullYear() +
          '-' +
          ('0' + (time.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + time.getDate()).slice(-2),
        open: response.o[index],
        high: response.h[index],
        low: response.l[index],
        close: response.c[index],
      };
      data.push(point);
    }
    candlestickSeries.setData(data);
  }
}
