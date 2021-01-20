import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  constructor(private httpClient: HttpClient) {}

  emitValues(values: Array<any>): Observable<any> {
    const emt = from(values);
    return emt.pipe(concatMap((x) => of(x).pipe(delay(4000))));
  }
}
