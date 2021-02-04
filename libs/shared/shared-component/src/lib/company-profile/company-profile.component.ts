import { Component, Input, OnInit } from '@angular/core';
import { FinancialsService } from '../data-access/financials.service';

@Component({
  selector: 'grillo-software-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  @Input() profile: any;

  public financials: any;
  public quote: any;

  constructor(private financialService: FinancialsService) {}

  ngOnInit(): void {}

  getFinancials(ticker: string) {
    this.financialService.basic(ticker).subscribe((response: any) => {
      console.log(response);
      this.financials = response;
      this.profile.financials = {
        metric: {
          '52WeekHighDate': this.financials.metric['52WeekHighDate'],
          '52WeekHigh': this.financials.metric['52WeekHigh'],
          '52WeekLowDate': this.financials.metric['52WeekLowDate'],
          '52WeekLow': this.financials.metric['52WeekLow'],
        },
      };
      this.getQuote(ticker);
    });
  }

  getQuote(ticker: string) {
    this.financialService.quote(ticker).subscribe((response: any) => {
      console.log(response);
      this.quote = response;
      this.profile.quote = this.quote;
      this.updateSymbol(this.profile);
    });
  }

  updateSymbol(data: any) {
    const doc = this.financialService.getDoc(data.symbol);
    console.log(doc);
    console.log(data);
    this.financialService
      .updateSymbol(doc, data)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
