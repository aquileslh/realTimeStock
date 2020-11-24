import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	constructor(
		private http: HttpClient
	) { }

	profile(symbol: string) {
		return this.http.get('https://finnhub.io/api/v1/stock/profile2?symbol=' + symbol + '&token=bu9jf2748v6tjsddpvpg');
	}

}
