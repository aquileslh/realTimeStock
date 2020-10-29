import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ForexSymbolService {

	constructor(
		private http: HttpClient
	) { }

	forexSymbol(symbol: string) {
		return this.http.get('https://finnhub.io/api/v1/stock/symbol?exchange=' + symbol + '&token=bu9jf2748v6tjsddpvpg');
	}

}
