import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grillo-software-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  @Input() profile: any;

  constructor() { }

  ngOnInit(): void {

  }

}
