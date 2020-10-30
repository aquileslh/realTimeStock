import { Component, OnInit } from '@angular/core';
import { ForexSymbolService } from '../data-access/forex-symbol.service';

@Component({
  selector: 'grillo-software-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public forexSymbols: any;

  constructor(private forexSymbol: ForexSymbolService) {}

  ngOnInit(): void {
    this.getSymbols('MX');
  }

  getSymbols(symbol: string): void {
    this.forexSymbol.forexSymbol(symbol).subscribe(
      (answers: any) => {
        this.forexSymbols = answers;
        console.log(this.forexSymbol);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
