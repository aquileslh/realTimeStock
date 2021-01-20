import { Component, OnInit } from '@angular/core';
import { UtilityService } from '@grillo-software/service';
import { BriefcaseService } from './../data-access/briefcase.service';

@Component({
  selector: 'grillo-software-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.scss'],
})
export class BriefcaseComponent implements OnInit {
  public symbol: any;

  private readonly nameCollection = 'portafolio';

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
            // this.symbol = { symbol: responseT };
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
    this.getList(this.nameCollection);
    this.getDoc();
  }

  addList() {
    const list = [
      {
        name: 'aerolineas',
        list: { list: ['AAL.MX', 'ABT.MX', 'AXP.MX', 'ABBV.MX', 'AAPL.MX'] },
      },
      {
        name: 'medicina',
        list: {
          list: [
            'TSLA.MX',
            'TTWO.MX',
            'TWLO.MX',
            'TWTR.MX',
            'TXN.MX',
            'UAA.MX',
            'UAL.MX',
            'UBER.MX',
          ],
        },
      },
    ];
    list.forEach((element) => {
      this.briefcaseService
        .setlistAfs(this.nameCollection, element.name, element.list)
        .then((response) => {
          console.log('agrega lista');
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  getDoc() {
    this.briefcaseService
      .getDoc(this.nameCollection)
      .subscribe((response: any) => {
        console.log('obtiene data');
        console.log(response);
      });
  }

  getList(name: string) {
    this.briefcaseService.getList(name).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
