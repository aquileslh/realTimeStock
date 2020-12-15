import { BriefcaseService } from './../data-access/briefcase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grillo-software-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.scss'],
})
export class BriefcaseComponent implements OnInit {
  constructor(private briefcaseService: BriefcaseService) {}

  ngOnInit(): void {
    this.briefcaseService.list().subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
