import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfiles } from 'src/app/store/profiles/profiles.selector';

@Component({
  selector: 'app-hr-visa-management-page',
  templateUrl: './hr-visa-management-page.component.html',
  styleUrls: ['./hr-visa-management-page.component.css']
})
export class HrVisaManagementPageComponent implements OnInit {
  constructor(private store: Store) {}

  userlist: any;

  ngOnInit(): void {
    this.store.select(selectProfiles)
      .subscribe((data:any) => {
        this.userlist = data;
      })
  }
}
