import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      this.emailValidator,
    ]),
    username: new FormControl('', [
      Validators.required,
      this.usernameValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.confirmPasswordValidator.bind(this),
    ]),
  });

  register(): void {
    if (!this.registerForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    const {email, username, password} = this.registerForm.getRawValue();
    const regisTokenEmail = this.route.snapshot.url[1].path;
    console.log(regisTokenEmail)
    const user = {
      email: email,
      username: username,
      password: password,
      regisTokenEmail: regisTokenEmail
    }
    this.authService.register(user);
    this.registerForm.reset({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  }

  // Custom validation (register)

  emailValidator(control: FormControl) {
    if (control.value.length === 0) {
      return null;
    } else if (control.value.length < 10 || control.value.length > 40) {
      return { emailValidator: true };
    } else {
      return null;
    }
  }

  usernameValidator(control: FormControl) {
    const specialChars = /[^a-zA-Z0-9 ]/g;
    if (control.value.length === 0) {
      return null;
    } else if (
      control.value.length < 5 ||
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

  confirmPasswordValidator(control: FormControl) {
    if (control.value.length === 0) {
      return null;
    } else if (control.value !== this.registerForm.getRawValue().password) {
      return { confirmPasswordValidator: true };
    } else {
      return null;
    }
  }
}
