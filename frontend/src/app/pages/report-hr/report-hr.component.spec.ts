import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHRComponent } from './report-hr.component';

describe('ReportHRComponent', () => {
  let component: ReportHRComponent;
  let fixture: ComponentFixture<ReportHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
