import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UserAction } from '../store/user/user.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isLoggedIn(): any {}

  getUser(authHeader: any): void {
    this.http
      .get('http://localhost:3000/users', authHeader)
      .subscribe((data: any) => {
        if (!data.success) {
          this.router.navigate(['/login']);
          this.toastr.error(data.msg);
        } else {
          this.store.dispatch(UserAction.getUser({ data }));
        }
      });
  }

  register(user: any): void {
    this.http
      .post('http://localhost:3000/users/register', user, httpOptions)
      .subscribe((data: any) => {
        if (!data.success) {
          this.router.navigate(['/register']);
          this.toastr.error(data.msg);
        } else {
          this.router.navigate(['/']);
          this.toastr.success(data.msg);
        }
      });
  }

  login(user: any): void {
    this.http
      .post('http://localhost:3000/users/login', user, httpOptions)
      .subscribe((data: any) => {
        if (!data.success) {
          this.router.navigate(['/']);
          this.toastr.error(data.msg);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isHR', data.user.isHR);
          
          this.store.dispatch(UserAction.logInUser({ data }));
          this.router.navigate(['/personalInformation']);
          this.toastr.success('You are successfully logged in!');
        }
      });
  }

  logout(): void {
    localStorage.clear();
    const user = null;
    this.store.dispatch(UserAction.logOutUser({ user }));
    this.toastr.success('You are successfully logged out!');
    this.router.navigate(['/']);
  }
}
