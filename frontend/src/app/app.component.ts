import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProfileService } from './services/profile.service';
import { Store } from '@ngrx/store';
import { ProfilesAction } from './store/profiles/profiles.action';

const token = localStorage.getItem('token');
const isHR = localStorage.getItem('isHR')
const httpOptionsWithToken = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  }),
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private profileService: ProfileService, private store: Store) {}
  ngOnInit(): void {
    if (token) {
      this.authService.getUser(httpOptionsWithToken);
      if (isHR) {
        this.profileService.getAllProfiles()
          .subscribe((response: any) => {
            this.store.dispatch(ProfilesAction.getProfiles({ data: response.data }))
          })
      }
    }
  }
}
