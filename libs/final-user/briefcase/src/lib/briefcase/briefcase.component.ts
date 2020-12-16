import { UtilityService } from '@grillo-software/service';
import { BriefcaseService } from './../data-access/briefcase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grillo-software-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.scss'],
})
export class BriefcaseComponent implements OnInit {

  public symbol: any;

  constructor(
    private briefcaseService: BriefcaseService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.briefcaseService.list('uno').subscribe(
      (response: any) => {
        console.log(response);
        this.utilityService.emitValues(response).subscribe(
          (responseT: any) => {
            console.log(responseT);
            this.symbol = {symbol: responseT};
          },
          (error: any) => {
            console.log(error);
          }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
