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
		return this.http.get('https://finnhub.io/api/v1/stock/candle?symbol=' + symbol + '&resolution=D&from=1598918400&to=1608065056&token=bu9jf2748v6tjsddpvpg');
	}

}
