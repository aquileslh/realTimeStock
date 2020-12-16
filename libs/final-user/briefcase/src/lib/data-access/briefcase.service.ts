import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BriefcaseService {
  constructor(private httpClient: HttpClient) {}

  public list(name: string) {
    return of([
      'AAL.MX',
      'BIIB.MX',
      'BMY.MX',
      'C.MX',
      'CAR.MX',
      'CCL1N.MX',
      'CLX.MX',
      'CNK.MX',
      'COP.MX',
      'DAL.MX',
      'DBX.MX',
      'DIS.MX',
      'DOCU.MX',
      'DPZ.MX',
      'EA.MX',
      'EBAY.MX',
      'F.MX',
      'CNC.MX',
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
      'HAL.MX',
      'HD.MX',
      'HTZ.MX',
      'IBM.MX',
      'INTC.MX',
      'JBLU.MX',
      'JDN.MX',
      'JNJ.MX',
      'JPM.MX',
      'LUV.MX',
      'LVS.MX',
      'MA.MX',
      'CVX.MX',
      'BYND.MX',
      'BIDUN.MX',
      'BA.MX',
      'AZNN.MX',
      'AXP.MX',
      'ABBV.MX',
      'AAPL.MX',
      'CCL.MX',
      'NVAX.MX',
    ]);
  }
}
