import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/store/user/user.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css'],
})
export class VisaStatusManagementComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  user: any;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
