import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTokenFoundComponent } from './no-token-found.component';

describe('NoTokenFoundComponent', () => {
  let component: NoTokenFoundComponent;
  let fixture: ComponentFixture<NoTokenFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoTokenFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTokenFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
