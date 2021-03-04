import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '@grillo-software/environments';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly profileCollection = 'profiles';
  private readonly withoutProfileCollection = 'withoutProfile';
  private readonly equivalentProfileCollection = 'equivalentProfile';

  public equivalentProfiles: [];

  constructor(
    private http: HttpClient,
    private readonly afs: AngularFirestore
  ) {}

  profile(symbol: string) {
    return this.http.get(
      environment.domainFinnhub +
        'profile2?symbol=' +
        symbol +
        '&token=' +
        environment.tokenFinnhub
    );
  }

  candles(symbol: string, resolution: string) {
    return this.http.get(
      'https://finnhub.io/api/v1/stock/candle?symbol=' +
        symbol +
        '&resolution=' +
        resolution +
        '&from=1598918400&to=1608065056&token=bu9jf2748v6tjsddpvpg'
    );
  }

  financials(symbol: string) {
    return this.http.get(
      'https://finnhub.io/api/v1/stock/metric?symbol=' +
        symbol +
        '&metric=all&token=bu9jf2748v6tjsddpvpg'
    );
  }

  save(symbol: string, data: any) {
    return this.afs.collection(this.profileCollection).doc(symbol).set(data);
  }

  saveWithoutProfile(symbol: string, data: any) {
    return this.afs
      .collection(this.withoutProfileCollection)
      .doc(symbol)
      .set(data);
  }

  deleteWithoutProfile(symbol: string) {
    return this.afs
      .collection(this.withoutProfileCollection)
      .doc(symbol)
      .delete();
  }

  saveEquivalentProfile(symbol: string, data: any) {
    return this.afs
      .collection(this.equivalentProfileCollection)
      .doc(symbol)
      .set(data);
  }

  deleteEquivalentProfile(symbol: string) {
    return this.afs
      .collection(this.equivalentProfileCollection)
      .doc(symbol)
      .delete();
  }

  equivalentProfile() {
    return this.afs
      .collection(this.equivalentProfileCollection)
      .snapshotChanges();
  }

  /**
   * Completa la informacion del perfil de la accion
   * @param symbolChange Objeto con informacion basica de accion
   */
  completeProfile(symbolData: any) {
    return this.profile(symbolData.symbolChange).pipe(
      map((response: any) => {
        if (response.country) {
          return {
            currency: response.currency,
            description: symbolData.description,
            displaySymbol: symbolData.displaySymbol,
            figi: symbolData.figi,
            mic: symbolData.mic,
            symbol: symbolData.symbol,
            symbolChange: symbolData.symbolChange,
            type: symbolData.type,
            country: response.country,
            exchange: response.exchange,
            ipo: response.ipo,
            marketCapitalization: response.marketCapitalization,
            name: response.name,
            phone: response.phone,
            shareOutstanding: response.shareOutstanding,
            ticker: response.ticker,
            weburl: response.weburl,
            logo: response.logo,
            finnhubIndustry: response.finnhubIndustry,
          };
        } else {
          return null
        }
      })
    );
  }
}
