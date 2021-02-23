import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInformationComponent } from './get-information.component';

describe('GetInformationComponent', () => {
  let component: GetInformationComponent;
  let fixture: ComponentFixture<GetInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
