import { TestBed } from '@angular/core/testing';

import { AuthHRGuard } from './auth-hr.guard';

describe('AuthHRGuard', () => {
  let guard: AuthHRGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthHRGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
