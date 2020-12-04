import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CandlesService } from '../data-access/candles.service';
import { ProfileService } from '../data-access/profile.service';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'grillo-software-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnChanges {
  @Input() symbol: any;

  public profilesMx = [];
  public profilesUs = [];
  public profilesOthers = [];

  constructor(
    public cd: ChangeDetectorRef,
    private profileService: ProfileService,
    private candlesService: CandlesService
  ) {
    // this.cd.detach();
  }

  ngOnChanges(values: any): void {
    // this.cd.detectChanges();
    console.log(values);
    if (values.symbol.currentValue !== undefined) {
      this.getProfile(values.symbol.currentValue.symbol);
    }
  }

  private getProfile(symbol: string): void {
    this.profileService.profile(symbol.replace(/ /g, '')).subscribe(
      (response: any) => {
        this.separateByCountry(response);
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
        break;
      default:
        this.profilesOthers.push(infoSymbol);
        break;
    }
    // this.cd.detectChanges();
  }

  graph(ticker: string, response: any) {
    console.log('graph');
    const chart = createChart(ticker, { width: 700, height: 100 });
    // const lineSeries = chart.addLineSeries();
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
    console.log(data);

    candlestickSeries.setData(data);
  }
}
