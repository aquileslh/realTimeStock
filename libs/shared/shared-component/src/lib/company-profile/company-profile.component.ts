import { Component, Input, OnInit } from '@angular/core';
import { FinancialsService } from '../data-access/financials.service';

@Component({
  selector: 'grillo-software-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  @Input() profile: any;

  constructor(private financialService: FinancialsService) {}

  ngOnInit(): void {}

  getFinancials(symbol: string) {
    this.financialService.basic(symbol).subscribe((response: any) => {
      console.log(response);
    });
  }
}
