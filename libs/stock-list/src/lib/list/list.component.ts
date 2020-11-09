import { Component, OnInit } from '@angular/core';
import { from, interval, of, timer } from 'rxjs';
import { ForexSymbolService } from '../data-access/forex-symbol.service';
import { concatMap, delay, map, mergeMap, take, timeout } from 'rxjs/operators';

@Component({
  selector: 'grillo-software-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public forexSymbols: any;

  constructor(private forexSymbol: ForexSymbolService) {}

  ngOnInit(): void {
    this.getSymbols('MX');
    // this.emiteValue();
  }

  getSymbols(symbol: string): void {
    this.forexSymbol.forexSymbol(symbol).subscribe(
      (answers: any) => {
        this.forexSymbols = answers;
        this.emiteValue(this.forexSymbols);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  emiteValue(forexymbol: any) {
    const emt = from(forexymbol);

    const qwe = emt.pipe(concatMap((x) => of(x).pipe(delay(2000))));

    qwe.subscribe((x: any) => {
      console.log(x);
    });
  }
}
