import { map, take } from 'rxjs/operators';
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
    //this.stockService.getAll().subscribe((e: any) => {
    this.stockService.getAll().subscribe((element) => {
      console.log(element.length);
      this.symbols = element;
      // this.symbols = element.forEach((e) => {
      //   console.log(e.payload.doc.id);
      //   console.log(e.payload.doc.data());
      //   this.symbols.push(e.payload.doc.data());
      // });
    });
  }
}
