import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfiles } from 'src/app/store/profiles/profiles.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-profile',
  templateUrl: './employees-profile.component.html',
  styleUrls: ['./employees-profile.component.css'],
})
export class EmployeesProfileComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  profiles$: Observable<any> = this.store.select(selectProfiles);
  searchText: string = '';
  
  ngOnInit(): void {}

  viewProfile(profileId: string): void {
    window.open(`/profile/${profileId}`, '_blank');
  }
}
