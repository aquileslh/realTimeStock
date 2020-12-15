import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';
import { ForexSymbolService } from '../data-access/forex-symbol.service';

@Component({
  selector: 'grillo-software-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public forexSymbols: any;
  public symbol: any;

  constructor(private forexSymbol: ForexSymbolService) {}

  ngOnInit(): void {
    this.getSymbols('MX');
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
    const qwe = emt.pipe(concatMap((x) => of(x).pipe(delay(4000))));
    qwe.pipe(take(20)).subscribe((x: any) => {
      this.symbol = x;
    });
  }
}
