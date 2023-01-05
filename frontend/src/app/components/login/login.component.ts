import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

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
