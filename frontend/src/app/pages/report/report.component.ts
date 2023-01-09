import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HouseAction } from 'src/app/store/house/house.actions';
import { selectHouse } from 'src/app/store/house/house.selector';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  user$: Observable<any> = this.store.select(selectUser);
  house$: Observable<any> = this.store.select(selectHouse);
  currentReport: any;
  userID: any;
  constructor(private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService) { }
  commentForm = this.fb.group({
    description: new FormControl('', [Validators.required,])
  })
  ngOnInit(): void {
    this.getCurrentReport();
  }
  getCurrentReport() {

    this.user$.subscribe(user => {
      this.userID = user.id;
      const houseID = user.house._id;
      const reportID = this.route.snapshot.url[1].path;
      this.http.get(`http://localhost:3000/house/${houseID}`)
        .subscribe((data: any) => {
          if (data.message !== 'House doesn\'t exist') {
            this.store.dispatch(HouseAction.getHouse({ data }))
            this.house$.subscribe(house => {
              for (let report of house.reports) {
                if (reportID === report._id) {
                  this.currentReport = report;
                }
              }
              if (!this.currentReport) {
                this.router.navigate(['/notFound'])
              }
            });

          } else {
            this.router.navigate(['/notFound']);
          }
        })
    })
  }
  createComment() {
    if (!this.commentForm.valid) {
      this.toastr.error('Inputs are invalid!');
      return;
    }
    const descriptionValue = this.commentForm.getRawValue().description;

    const newComment = {
      userID: this.userID,
      reportID: this.currentReport._id,
      description: descriptionValue
    }
    this.http.put(`http://localhost:3000/house/comment`, newComment)
      .subscribe(data => {
        this.toastr.success('New comment added')
        this.getCurrentReport();
      })
    this.commentForm.reset({
      description: ''
    })
  }
}
