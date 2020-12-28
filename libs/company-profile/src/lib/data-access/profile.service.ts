import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
@Injectable({
	providedIn: 'root'
})
export class ProfileService {

  private readonly nameCollection = 'profiles';

	constructor(
    private http: HttpClient,
    private readonly afs: AngularFirestore
	) { }

	profile(symbol: string) {
		return this.http.get('https://finnhub.io/api/v1/stock/profile2?symbol=' + symbol + '&token=bu9jf2748v6tjsddpvpg');
	}

  save(symbol: string, data: any) {
    return this.afs.collection(this.nameCollection).doc(symbol).set(data);

  }
}
