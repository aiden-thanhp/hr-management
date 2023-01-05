import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/store/user/user.selector';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);

  constructor(private authService: AuthService, private store: Store) {}
  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
