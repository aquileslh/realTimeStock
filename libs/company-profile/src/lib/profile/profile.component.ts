import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { CandlesService } from '../data-access/candles.service';
import { ProfileService } from '../data-access/profile.service';
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

  ngOnChanges(values: any): void {
    if (values.symbol.currentValue !== undefined) {
      this.getProfile(values.symbol.currentValue.symbol);
    }
  }

  private getProfile(symbol: string): void {
    console.log(symbol);
    this.profileService.profile(symbol.replace(/ /g, '')).subscribe(
      (response: any) => {
        if (response.country) {
          this.separateByCountry(response);
        } else {
          const data = {
            country: null,
            ticker: symbol,
          };
          this.separateByCountry(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

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
