import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReportAction } from 'src/app/store/report/report.actions';
import { selectReport } from 'src/app/store/report/report.selector';
import { selectUser } from 'src/app/store/user/user.selector';


@Component({
  selector: 'app-report-hr',
  templateUrl: './report-hr.component.html',
  styleUrls: ['./report-hr.component.css']
})
export class ReportHRComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  report$: Observable<any> = this.store.select(selectReport);
  userID: any;
  reportID: any;
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
      const reportID = this.route.snapshot.url[2].path;
      this.http.get(`http://localhost:3000/house/report/${reportID}`)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.store.dispatch(ReportAction.getReport({ data }));
              this.report$.subscribe((report) => {
                this.reportID = report._id;
              })
            } else {
              this.router.navigate(['/notFound']);
            }
          },
          error: (error) => {
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
      reportID: this.reportID,
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
