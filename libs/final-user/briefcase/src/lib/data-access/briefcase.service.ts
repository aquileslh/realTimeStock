import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class BriefcaseService {
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private httpClient: HttpClient,
    private readonly afs: AngularFirestore
  ) {}

  getDoc(nameCollection: string) {
    this.itemsCollection = this.afs.collection(nameCollection);
    return this.itemsCollection.valueChanges({ idField: 'customID' });
  }

  setlistAfs(nameCollection: string, nameDoc: string, data: any) {
    return this.afs.collection(nameCollection).doc(nameDoc).set(data);
  }

  getList(name: string) {
    this.itemsCollection = this.afs.collection<any>(name);
    return this.itemsCollection.snapshotChanges().pipe(
      map((actions: Array<any>) => {
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return of({ id, ...data });
        });
      })
    );
  }

  public list(name: string) {
    return of([
      'AAL.MX',
      'ABT.MX',
      'AXP.MX',
      'ABBV.MX',
      'AAPL.MX',
      'AMC.MX',
      'AMD.MX',
      'AMGN.MX',
      'AZNN.MX',
      'BIIB.MX',
      'BMY.MX',
      'BYND.MX',
      'BIDUN.MX',
      'BA.MX',
      'BMRN.MX',
      'BSX.MX',
      'CVX.MX',
      'C.MX',
      'CAR.MX',
      'CCL1N.MX',
      'CLX.MX',
      'CNK.MX',
      'COP.MX',
      'CCL.MX',
      'CNC.MX',
      'CHS.MX',
      'CPE.MX',
      'CRM.MX',
      'DAL.MX',
      'DBX.MX',
      'DIS.MX',
      'DOCU.MX',
      'DPZ.MX',
      'DDD.MX',
      'DHR.MX',
      'EA.MX',
      'EBAY.MX',
      'EL.MX',
      'ENPH.MX',
      'ET.MX',
      'F.MX',
      'FB.MX',
      'FDX.MX',
      'FE.MX',
      'FSLR.MX',
      'FSLY.MX',
      'GE.MX',
      'GGAN.MX',
      'GILD.MX',
      'GM.MX',
      'GOLDN.MX',
      'GPS.MX',
      'GS.MX',
      'GD.MX',
      'GIS.MX',
      'GME.MX',
      'GT.MX',
      'HAL.MX',
      'HD.MX',
      'HTZ.MX',
      'IBM.MX',
      'INTC.MX',
      'ILMN.MX',
      'JBLU.MX',
      'JDN.MX',
      'JNJ.MX',
      'JPM.MX',
      'JWN.MX',
      'KHC.MX',
      'LUV.MX',
      'LVS.MX',
      'LLY.MX',
      'M.MX',
      'MCD.MX',
      'MA.MX',
      'MDLA.MX',
      'MET.MX',
      'MGM.MX',
      'MMM.MX',
      'MPC.MX',
      'MRK.MX',
      'MRNA.MX',
      'MRO.MX',
      'MSFT.MX',
      'MU.MX',
      'NCLH.MX',
      'NEM.MX',
      'NKE.MX',
      'NSC.MX',
      'NVAX.MX',
      'ODFL.MX',
      'ORCL.MX',
      'OXY.MX',
      'PFE.MX',
      'PG.MX',
      'PINS.MX',
      'PLD.MX',
      'PTON.MX',
      'PYPL.MX',
      'QCOM.MX',
      'RCL.MX',
      'REGN.MX',
      'ROST.MX',
      'SBUX.MX',
      'SBAC.MX',
      'SPGI.MX',
      'STAG.MX',
      'STWD.MX',
      'STZ.MX',
      'SWKS.MX',
      'T.MX',
      'TDOC.MX',
      'TGT.MX',
      'TLRD.MX',
      'TSLA.MX',
      'TTWO.MX',
      'TWLO.MX',
      'TWTR.MX',
      'TXN.MX',
      'UAA.MX',
      'UAL.MX',
      'UBER.MX',
    ]);
  }
}
