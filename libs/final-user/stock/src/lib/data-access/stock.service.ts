import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})

export class StockService {
  private readonly profileCollection = 'profiles';

  constructor(private readonly afs: AngularFirestore) {}

  getAll() {
    return this.afs.collection(this.profileCollection).snapshotChanges();
  }
}
