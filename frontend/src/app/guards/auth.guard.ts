import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}
  canActivate(): any {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.toastr.error('Login required!');
      return false;
    }
  }
}
