import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ForexRatesService {

	constructor(
		private http: HttpClient
	) { }

	usd(): Observable<any> {
		return this.http.get('https://finnhub.io/api/v1/forex/rates?base=USD&token=bu9jf2748v6tjsddpvpg');
	}

}
