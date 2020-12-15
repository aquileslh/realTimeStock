import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForexRatesService } from '../data-access/fores-rates.service';

@Component({
  selector: 'grillo-software-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.scss'],
})
export class IndicesComponent implements OnInit {
  public dollarPrice$: Observable<any>;

  constructor(private forexRates: ForexRatesService) {}

  ngOnInit(): void {
    this.forexRatesUsd();
  }
  forexRatesUsd(): void {
    this.dollarPrice$ = this.forexRates.usd();
  }
}
