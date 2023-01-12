import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HouseAction } from 'src/app/store/house/house.actions';
import { selectHouse } from 'src/app/store/house/house.selector';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent implements OnInit {

  user$: Observable<any> = this.store.select(selectUser);
  house$: Observable<any> = this.store.select(selectHouse);
  userHouse: any;
  houseID: any;
  userID: any;

  constructor(private store: Store,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) { }
  reportForm = this.fb.group({
    title: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,])
  })
  ngOnInit(): void {
    this.user$.subscribe(user => {

      if (user.isLoggedIn && !user.profile) {
        this.router.navigateByUrl('/personalInformation')
      }
      this.userID = user.id;
      this.houseID = user.house._id;
      this.getCurrentHouse();

      
    })
  }
  getCurrentHouse() {
    this.http.get(`http://localhost:3000/house/${this.houseID}`)
      .subscribe({
        next: (data: any) => {
          this.store.dispatch(HouseAction.getHouse({ data }))
          this.house$.subscribe(house => this.userHouse = house);
        },
        error: (error) => {
          console.log(error)
          this.router.navigate(['/notFound']);
        }
      }
      )
  }
  createReport() {
    if (!this.reportForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    const titleValue = this.reportForm.getRawValue().title;
    const descriptionValue = this.reportForm.getRawValue().description;

    const newReport = {
      userID: this.userID,
      houseID: this.houseID,
      title: titleValue,
      description: descriptionValue
    }
    this.http.put(`http://localhost:3000/house/report`, newReport)
      .subscribe(data => {
        this.getCurrentHouse();
      })
    this.reportForm.reset({
      title: '',
      description: ''
    })
  }
}
