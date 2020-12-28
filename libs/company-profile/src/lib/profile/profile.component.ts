import { Component, Input, OnChanges } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { CandlesService } from '../data-access/candles.service';
import { ProfileService } from '../data-access/profile.service';

export interface symbolData {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

export interface profile {
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
export class ProfileComponent implements OnChanges {
  @Input() symbol: any;

  public profilesMx = [];
  public profilesUs = [];
  public profilesOthers = [];

  constructor(
    private profileService: ProfileService,
    private candlesService: CandlesService
  ) {}

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
  private getProfile(symbolData: symbolData): void {
    console.log(symbolData);
    this.profileService.profile(symbolData.symbol.replace(/ /g, '')).subscribe(
      (response: profile) => {
        if (response.country) {
          const profile = {
            ...symbolData,
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
          this.profileService.save(
            symbolData.symbol.replace(/ /g, ''),
            profile
          );
        } else {
          const data = {
            country: null,
            ticker: symbolData.symbol,
          };
          // this.separateByCountry(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   *
   * @param infoSymbol
   */
  private separateByCountry(infoSymbol: any): void {
    switch (infoSymbol.country) {
      case 'MX':
        this.profilesMx.push(infoSymbol);
        this.candlesService
          .candles(infoSymbol.ticker)
          .subscribe((response: any) => {
            this.graph(infoSymbol.ticker, response);
          });
        break;
      case 'US':
        this.profilesUs.push(infoSymbol);
        this.candlesService
          .candles(infoSymbol.ticker)
          .subscribe((response: any) => {
            this.graph(infoSymbol.ticker, response);
          });
        break;
      default:
        this.profilesOthers.push(infoSymbol);
        break;
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
