import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HouseAction } from 'src/app/store/house/house.actions';
import { selectHouse } from 'src/app/store/house/house.selector';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-house-summary',
  templateUrl: './house-summary.component.html',
  styleUrls: ['./house-summary.component.css']
})
export class HouseSummaryComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  adminID: any;
  house$: Observable<any> = this.store.select(selectHouse);
  constructor(private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private elementRef: ElementRef) { }
  statusForm = this.fb.group({
    status: new FormControl(''),
  })
  ngOnInit(): void {
    this.getCurrentHouse();
  }
  getCurrentHouse() {
    this.user$.subscribe(user => {
      this.adminID = user.id;
      const houseID = this.route.snapshot.url[1].path;
      this.http.get(`http://localhost:3000/house/${houseID}`)
        .subscribe({
          next: (data) => {
            this.store.dispatch(HouseAction.getHouse({ data }))
            this.house$.subscribe(house => {
            })
          },
          error: (error) => {
            console.log(error)
            this.router.navigate(['/notFound'])
          }
        })
    })
  }
  changeStatusClick(id: string) {
    const statusValue = this.elementRef.nativeElement.querySelector(`#status${id}`).value;
    const body = {
      status: statusValue
    }
    this.http.put(`http://localhost:3000/house/report/${id}/status`, body)
    .subscribe({
      next: (data)=> {
        this.toastr.success('Report status updated');
      },
      error: (error) => {

      }
    })
  }
}
