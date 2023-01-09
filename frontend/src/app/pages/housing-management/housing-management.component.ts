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
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.css']
})
export class HousingManagementComponent implements OnInit {

  user$: Observable<any> = this.store.select(selectUser);
  houses$: Observable<any> = this.store.select(selectHouse);
  constructor(private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) {
  }
  houseForm = this.fb.group({
    address: new FormControl('', [Validators.required,]),
    landlordName: new FormControl('', [Validators.required,]),
    landlordPhone: new FormControl('', [Validators.required,]),
    landlordEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    beds: new FormControl('', [Validators.required,]),
    mattress: new FormControl('', [Validators.required,]),
    tables: new FormControl('', [Validators.required,]),
    chairs: new FormControl('', [Validators.required,]),
  })
  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.getHouses();
      }
    })
  }
  getHouses() {
    this.http.get(`http://localhost:3000/house`)
      .subscribe((data: any) => {
        if (data.message !== 'House doesn\'t exist') {
          this.store.dispatch(HouseAction.getHouses({ data }))
        } else {
          this.router.navigate(['/notFound']);
        }
      })
  }
  createHouse() {
    if (!this.houseForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    const newHouse = {
      address: this.houseForm.getRawValue().address,
      landlordName: this.houseForm.getRawValue().landlordName,
      landlordPhone: this.houseForm.getRawValue().landlordPhone,
      landlordEmail: this.houseForm.getRawValue().landlordEmail,
      beds: this.houseForm.getRawValue().beds,
      mattress: this.houseForm.getRawValue().mattress,
      tables: this.houseForm.getRawValue().tables,
      chairs: this.houseForm.getRawValue().chairs,
    }
    this.http.post(`http://localhost:3000/house`, newHouse)
      .subscribe(data => {
        this.toastr.success('The house is created')
        this.getHouses();
      })
    this.houseForm.reset({
      address: '',
      landlordName: '',
      landlordPhone: '',
      landlordEmail: '',
      beds: '',
      mattress: '',
      tables: '',
      chairs: '',
    })
  }
  deleteClick(id: string) {
    this.http.delete(`http://localhost:3000/house/${id}`)
    .subscribe(data => {
      this.toastr.success('The house is deleted')
      this.getHouses();
    })
  }
}
