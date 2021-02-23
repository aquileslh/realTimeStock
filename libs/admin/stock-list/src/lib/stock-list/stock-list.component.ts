import { concatMap, delay, take } from 'rxjs/operators';
import { ForexSymbolService } from './../data-access/forex-symbol.service';
import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { ProfileService } from '../data-access/profile.service';

@Component({
  selector: 'grillo-software-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  public forexSymbols: any;
  public symbol: any;

  constructor(
    private forexSymbol: ForexSymbolService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getSymbols('MX');
    this.profileService.equivalentProfile().subscribe((red: any) => {
      this.profileService.equivalentProfiles = red;
    });
  }

  /**
   * Obtiene todos los simbolos listados en algúna bolsa del mundo
   * @param exchange bolsa de algún país
   */
  getSymbols(exchange: string): void {
    this.forexSymbol.forexSymbol(exchange).subscribe(
      (answers: any) => {
        this.forexSymbols = answers;
        this.emiteValue(this.forexSymbols);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * Emite un valor cada xx segundos y lo asigna a una variable global
   * @param forexymbol Lista de simbolos
   */
  emiteValue(forexymbol: any) {
    const emt = from(forexymbol);
    const qwe = emt.pipe(concatMap((x) => of(x).pipe(delay(5000))));
    qwe.pipe(take(30)).subscribe((x: any) => {
    //qwe.subscribe((x: any) => {
      x.symbol = x.symbol.replace(/ /g, '');
      x.symbolChange = x.symbol.replace('*', '');
      this.symbol = x;
    });
  }
}
