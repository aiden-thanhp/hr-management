import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { selectProfiles } from 'src/app/store/profiles/profiles.selector';
import { RegisTokenAction } from 'src/app/store/regisToken/regisToken.action';
import { selectRegisToken } from 'src/app/store/regisToken/regisToken.selector';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css']
})
export class HiringManagementComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) { }
  regisTokens$: Observable<any> = this.store.select(selectRegisToken);
  profiles$: Observable<any> = this.store.select(selectProfiles);

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.token}`,
      }),
    };
    this.getRegistrationTokens();

    // this.store.select(selectProfiles)
    //   .subscribe((data: any) => {
    //     console.log(data)
    //   })
  }
  token: any;
  httpOptionsWithToken: any;
  getRegistrationTokens() {
    this.http.get('http://localhost:3000/hr/regisTokens', this.httpOptionsWithToken).subscribe({
      next: (data) => {
        this.store.dispatch(RegisTokenAction.getRegistrationtoken({ data }));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  inputForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    this.emailValidator]),
    name: new FormControl('', [Validators.required]),
  })
  sendEmail() {
    if (!this.inputForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    const emailValue = this.inputForm.getRawValue().email;
    const nameValue = this.inputForm.getRawValue().name;
    this.http.post('http://localhost:3000/hr/sendToken'
      , {
        email: emailValue,
        name: nameValue
      }
      , this.httpOptionsWithToken)
      .subscribe({
        next: (data: any) => {
          console.log(data)
          this.getRegistrationTokens();
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    this.inputForm.reset({
      email: '',
      name: ''
    })
  }

  emailValidator(control: FormControl) {
    if (control.value.length === 0) {
      return null;
    } else if (control.value.length < 10 || control.value.length > 40) {
      return { emailValidator: true };
    } else {
      return null;
    }
  }
  
  viewProfile(profileId: string): void {
    window.open(`/profile/${profileId}`, '_blank')
  }
}
