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

  getFinancials(symbol: string) {
    this.financialService.basic(symbol).subscribe((response: any) => {
      console.log(response);
      this.financials = response;
      this.getQuote(symbol);
    });
  }

  getQuote(symbol: string) {
    this.financialService.quote(symbol).subscribe(
      (response: any) => {
        console.log(response);
        this.quote = response;
      }
    )
  }
}
