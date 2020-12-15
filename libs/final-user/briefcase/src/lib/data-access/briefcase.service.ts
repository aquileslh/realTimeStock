import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BriefcaseService {
  constructor(private httpClient: HttpClient) { }

  public list() {
    return of(['AAL', 'APPL', 'CCL']);
  }
}
