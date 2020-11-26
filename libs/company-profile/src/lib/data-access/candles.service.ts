import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CandlesService {

	constructor(
		private http: HttpClient
	) { }

	candles(symbol: string) {
		return this.http.get('https://finnhub.io/api/v1/stock/candle?symbol=' + symbol + '&resolution=D&from=1572651390&to=1575243390&token=bu9jf2748v6tjsddpvpg');
	}

}
