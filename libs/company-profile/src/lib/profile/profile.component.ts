import { map } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { pipe } from 'rxjs';
import { CandlesService } from '../data-access/candles.service';
import { ProfileService } from '../data-access/profile.service';

export interface SymbolData {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
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
  selector: 'grillo-software-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnChanges, OnInit {
  @Input() symbol: any;

  public profiles = [];
  private equivalentProfile = [];
  constructor(
    private profileService: ProfileService,
    private candlesService: CandlesService
  ) {}

  ngOnInit() {
    this.profileService.equivalentProfile().subscribe(
      (red: any) => {
        this.equivalentProfile = red;
        // red.forEach(element => {
        //   console.log(element.payload.doc.data());
        //   console.log(element.payload.doc.id);
        // });
      }
      // map((actions) =>
      //   actions.map((a) => {
      //     console.log(a.payload.doc.data());
      //     console.log(a.payload.doc.id);
      //   })
      // )
    );
  }

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
    this.equivalentProfile.forEach((element) => {
      if (element.payload.doc.id === symbolData.symbol.replace(/ /g, '')) {
        // console.log('sustitucion');
        symbolData.symbol = element.payload.doc.data().symbol;
      }
    });
    // console.log(symbolData);
    this.profileService.profile(symbolData.symbol.replace(/ /g, '')).subscribe(
      (response: Profile) => {
        if (response.country) {
          const profile = {
            currency: symbolData.currency,
            description: symbolData.description,
            displaySymbol: symbolData.displaySymbol,
            figi: symbolData.figi,
            mic: symbolData.mic,
            symbol: symbolData.symbol.replace(/ /g, ''),
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
          };
          this.profileService.save(profile.symbol, profile).then((resp) => {
            this.profiles.push(profile);
          });
        } else {
          const symbol = symbolData.symbol.replace(/ /g, '');
          const equivalent = symbol.split('*');
          this.profileService.saveWithoutProfile(symbol, symbolData);
          symbolData.symbol = equivalent[0];
          this.profileService.saveEquivalentProfile(symbol, symbolData);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
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
