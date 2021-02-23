import { environment } from '@grillo-software/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
@Injectable({
	providedIn: 'root'
})
export class ProfileService {

  private readonly profileCollection = 'profiles';
  private readonly withoutProfileCollection = 'withoutProfile';
  private readonly equivalentProfileCollection = 'equivalentProfile';

  public equivalentProfiles: [];

	constructor(
    private http: HttpClient,
    private readonly afs: AngularFirestore
	) { }

	profile(symbol: string) {
		return this.http.get(environment.domainFinnhub + 'profile2?symbol=' + symbol + '&token=' + environment.tokenFinnhub);
	}

  save(symbol: string, data: any) {
    return this.afs.collection(this.profileCollection).doc(symbol).set(data);
  }

  saveWithoutProfile(symbol: string, data: any) {
    return this.afs.collection(this.withoutProfileCollection).doc(symbol).set(data);
  }

  deleteWithoutProfile(symbol: string) {
    return this.afs.collection(this.withoutProfileCollection).doc(symbol).delete();
  }

  saveEquivalentProfile(symbol: string, data: any) {
    return this.afs.collection(this.equivalentProfileCollection).doc(symbol).set(data);
  }

  deleteEquivalentProfile(symbol: string) {
    return this.afs.collection(this.equivalentProfileCollection).doc(symbol).delete()
  }

  equivalentProfile(){
    return this.afs.collection(this.equivalentProfileCollection).snapshotChanges();
  }

}
