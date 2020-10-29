import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForexRatesService } from '../data-access/fores-rates.service';
import { ForexSymbolService } from '../data-access/forex-symbol.service';

@Component({
  selector: 'grillo-software-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public dollarPrice$: Observable<any>;
  public forexSymbols: any

  constructor(
		private forexRates: ForexRatesService,
		private forexSymbol: ForexSymbolService,
	) { }

	ngOnInit(): void {
		this.forexRatesUsd();
	  this.getSymbols('MX');
	}

	forexRatesUsd(): void {
    this.dollarPrice$ = this.forexRates.usd();
	}

	getSymbols(symbol: string): void {
		this.forexSymbol.forexSymbol(symbol).subscribe(
			(answers: any) => {
        this.forexSymbols = answers;
        console.log(this.forexSymbol);
			},
			(error: any) => { console.log(error); }
		);
	}

}
