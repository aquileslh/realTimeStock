import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grillo-software-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() symbol: any;

  constructor() { }

  ngOnInit(): void {
  }

}
