import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { ProfileService } from '../data-access/profile.service';

@Component({
  selector: 'grillo-software-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnChanges {

  @Input() symbol: any;

  public profiles = [];

  constructor(public cd: ChangeDetectorRef,
    private profileService: ProfileService) {
    this.cd.detach();
  }

  ngOnChanges(values: any): void {
    this.cd.detectChanges();
    console.log(values);
    if (values.symbol.currentValue !== undefined) {
      this.getProfile(values.symbol.currentValue.symbol);
    }
  }

  getProfile(symbol: string) {
    this.profileService.profile(symbol.replace(/ /g, '')).subscribe(
      (response: any) => {
        this.profiles.push(response);
        this.cd.detectChanges();
      },
      (error: any) => {console.log(error);}
    );
  }

}
