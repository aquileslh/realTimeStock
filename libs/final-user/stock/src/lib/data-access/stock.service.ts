import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})

export class StockService {
  private readonly profileCollection = 'profiles';

  constructor(private readonly afs: AngularFirestore) {}

  getAll() {
    return this.afs.collection(this.profileCollection).valueChanges();
  }

  getToCountry(country: any) {
    return this.afs.collection(this.profileCollection, ref => ref.where('country', '==', country)).valueChanges();
  }
}
