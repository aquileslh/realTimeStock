import { Component, OnInit } from '@angular/core';
import { StockService } from './../data-access/stock.service';

@Component({
  selector: 'grillo-software-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  public symbols: any;
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getAll().subscribe((element) => {
      console.log(element.length);
      this.symbols = element;
    });
  }

  filterToCountry(country: string) {
    console.log(country);
    this.stockService.getToCountry(country).subscribe((response: any) => {
      // console.log(response);
      this.symbols = response;
    });
  }

}
