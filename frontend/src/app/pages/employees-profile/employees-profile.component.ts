import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProfiles } from 'src/app/store/profiles/profiles.selector';

@Component({
  selector: 'app-employees-profile',
  templateUrl: './employees-profile.component.html',
  styleUrls: ['./employees-profile.component.css'],
})
export class EmployeesProfileComponent implements OnInit {
  constructor(private store: Store) {}

  searchText: string = '';
  users: any;

  ngOnInit(): void {
    this.store.select(selectProfiles).subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
  }

  viewProfile(profileId: string): void {
    window.open(`/profile/${profileId}`, '_blank');
  }
}
