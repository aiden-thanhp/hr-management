import { TestBed } from '@angular/core/testing';

import { AuthEmployeesGuard } from './auth-employees.guard';

describe('AuthEmployeesGuard', () => {
  let guard: AuthEmployeesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEmployeesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
