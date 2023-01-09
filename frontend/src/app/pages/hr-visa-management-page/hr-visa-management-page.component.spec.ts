import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVisaManagementPageComponent } from './hr-visa-management-page.component';

describe('HrVisaManagementPageComponent', () => {
  let component: HrVisaManagementPageComponent;
  let fixture: ComponentFixture<HrVisaManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrVisaManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrVisaManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
