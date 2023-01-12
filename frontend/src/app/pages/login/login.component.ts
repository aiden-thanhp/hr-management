import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { selectUser } from 'src/app/store/user/user.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('isHR') == 'true') {
        this.router.navigate(['/hiringManagement'])
      } else {
        this.store.select(selectUser)
          .subscribe((user: any) => {
            if (user.id) {
              if (user.profile?.onboardingStatus != "Approved") this.router.navigate(['/onboarding'])
              else this.router.navigate(['/personalInformation'])
            }
          })
      }
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      this.usernameValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  login(): void {
    if (!this.loginForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    this.authService.login(this.loginForm.getRawValue());
    this.loginForm.reset({ username: '', password: '' });
  }
  // Custom validation (login)

  usernameValidator(control: FormControl) {
    const specialChars = /[^a-zA-Z0-9 ]/g;
    if (control.value.length === 0) {
      return null;
    } else if (
      control.value.length < 4 ||
      control.value.length > 10 ||
      control.value.match(specialChars)
    ) {
      return { usernameValidator: true };
    } else {
      return null;
    }
  }

  passwordValidator(control: FormControl) {
    const isAllPresent = (str: any) => {
      const pattern = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$'
      );
      if (pattern.test(str)) return true;
      return false;
    };
    if (control.value.length === 0) {
      return null;
    } else if (
      control.value.length < 4 ||
      control.value.length > 12 ||
      !isAllPresent(control.value)
    ) {
      return { passwordValidator: true };
    } else {
      return null;
    }
  }
}
