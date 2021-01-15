import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FinancialsService {
  constructor(private http: HttpClient) {}

  basic(symbol: string) {
    return this.http.get(
      'https://finnhub.io/api/v1/stock/metric?symbol=' +
        symbol +
        '&metric=all&token=bu9jf2748v6tjsddpvpg'
    );
  }

  quote(symbol: string) {
    return this.http.get(
      'https://finnhub.io/api/v1/quote?symbol=' +
        symbol +
        '&token=bu9jf2748v6tjsddpvpg'
    );
  }
}
