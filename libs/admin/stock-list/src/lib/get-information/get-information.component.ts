import { map, mergeMap } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { ProfileService } from '../data-access/profile.service';
import { ForexSymbolService } from '../data-access/forex-symbol.service';
import { of } from 'rxjs';

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

  constructor(private profileService: ProfileService,
    private forexService: ForexSymbolService) {}

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
      this.profileService.profile(symbolData.symbolChange).pipe(
        map((response: any) => ({
                  currency: response.currency,
                  description: symbolData.description,
                  displaySymbol: symbolData.displaySymbol,
                  figi: symbolData.figi,
                  mic: symbolData.mic,
                  symbol: symbolData.symbol,
                  symbolChange: symbolData.symbolChange,
                  type: symbolData.type,
                  country: response.country,
                  exchange: response.exchange,
                  ipo: response.ipo,
                  marketCapitalization: response.marketCapitalization,
                  name: response.name,
                  phone: response.phone,
                  shareOutstanding: response.shareOutstanding,
                  ticker: response.ticker,
                  weburl: response.weburl,
                  logo: response.logo,
                  finnhubIndustry: response.finnhubIndustry,
                })),
        mergeMap((x: any) => this.forexService.candles(x.ticker))
      ).subscribe(
        (resp: any) => {
          console.log(resp);
        }
      );
      // this.profileService.profile(symbolData.symbolChange).subscribe(
      //   (response: Profile) => {
      //     if (response.country) {
      //       const profile = {
      //         currency: response.currency,
      //         description: symbolData.description,
      //         displaySymbol: symbolData.displaySymbol,
      //         figi: symbolData.figi,
      //         mic: symbolData.mic,
      //         symbol: symbolData.symbol,
      //         symbolChange: symbolData.symbolChange,
      //         type: symbolData.type,
      //         country: response.country,
      //         exchange: response.exchange,
      //         ipo: response.ipo,
      //         marketCapitalization: response.marketCapitalization,
      //         name: response.name,
      //         phone: response.phone,
      //         shareOutstanding: response.shareOutstanding,
      //         ticker: response.ticker,
      //         weburl: response.weburl,
      //         logo: response.logo,
      //         finnhubIndustry: response.finnhubIndustry,
      //       };
      //       this.profileService.save(profile.symbol, profile).then((resp) => {
      //         console.log('guardado', profile.symbolChange, resp);
      //         this.profiles.push(profile);
      //       });
      //       // elimina sin perfil si se encuantra en la lista
      //       this.profileService
      //         .deleteWithoutProfile(symbolData.displaySymbol.replace(/ /g, ''))
      //         .then((resp) => {
      //           console.log('eliminado', profile.symbolChange, resp);
      //         });
      //     } else {
      //       debugger;
      //       if (withEquivalent) {
      //         // Elimina la equivalencio si no se encuentra el perfil
      //         this.profileService
      //           .deleteEquivalentProfile(symbolData.symbol)
      //           .then((resp) => {
      //             console.log('eliminado equivalente', symbolData.symbol, resp);
      //           });
      //       } else {
      //         // Guarda en lista sin perfil y posible equivalencia
      //         this.profileService
      //           .saveWithoutProfile(symbolData.symbol, symbolData)
      //           .then((resp) => {
      //             console.log(
      //               'guardado sin profile',
      //               symbolData.symbolChange,
      //               resp
      //             );
      //           });
      //         const equivalent = symbolData.symbolChange.split('.'); // Se pretende Eliminar la parte de .MX del symbol
      //         symbolData.symbolChange = equivalent[0];
      //         this.profileService
      //           .saveEquivalentProfile(symbolData.symbol, symbolData)
      //           .then((resp) => {
      //             console.log(
      //               'guardado equivalente',
      //               symbolData.symbolChange,
      //               resp
      //             );
      //           });
      //       }
      //     }
      //   },
      //   (error: any) => {
      //     console.log(error);
      //   }
      // );
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
