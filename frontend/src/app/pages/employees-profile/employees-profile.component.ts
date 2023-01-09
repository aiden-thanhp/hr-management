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

  searchText: string = '';
  users: any;
  
  ngOnInit(): void {
    this.store.select(selectProfiles)
      .subscribe((data: any) => {
        console.log(data)
        this.users = data
      })
  }

  viewProfile(profileId: string): void {
    window.open(`/profile/${profileId}`, '_blank');
  }
}
