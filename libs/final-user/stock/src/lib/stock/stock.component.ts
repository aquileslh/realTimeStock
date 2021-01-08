import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { StockService } from './../data-access/stock.service';

@Component({
  selector: 'grillo-software-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getAll().subscribe((e: any) => {
      e.forEach((element) => {
        console.log(element.data());
      });
    });
  }
}
