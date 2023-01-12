import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/store/user/user.selector';
import { Store } from '@ngrx/store';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserAction } from 'src/app/store/user/user.actions';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css'],
})
export class VisaStatusManagementComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  user: any;
  fileObj: any;

  constructor(
    private store: Store,
    private fileUploadService: FileUploadService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
      console.log(user)

      if (user.isLoggedIn && !user.profile) {
        this.router.navigateByUrl('/personalInformation')
      }
    });
  }

  download(url: string): void {
    this.httpClient
      .get(url, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = url;

        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      });
  }

  onFilePicked(event: Event): void {
    const target = event.target as HTMLInputElement;
    const FILE = (target.files as FileList)[0];
    this.fileObj = FILE;
  }
  onFileUpload(event: Event) {
    event.preventDefault();
    const name = (event.target as HTMLElement).getAttribute('id');

    if (!this.fileObj) {
      return;
    }
    this.fileUploadService
      .getPresignedUrl(this.fileObj.name, this.fileObj.type)
      .subscribe((res: any) => {
        const fileUploadUrl = res.data;
        this.fileUploadService
          .uploadfileAWSS3(fileUploadUrl, this.fileObj?.type, this.fileObj)
          .subscribe();

        const newProfile = { ...this.user.profile };
        newProfile.optFiles = { ...this.user.profile.optFiles };
        newProfile.optStatus = { ...this.user.profile.optStatus };

        if (name === 'RECEIPT') {
          newProfile.optFiles.optReceipt = fileUploadUrl.split('?')[0];
          newProfile.optStatus.optReceipt = 'Pending';
        }
        if (name === 'EAD') {
          newProfile.optFiles.optEAD = fileUploadUrl.split('?')[0];
          newProfile.optStatus.optEAD = 'Pending';
        }
        if (name === 'I983') {
          newProfile.optFiles.optI983 = fileUploadUrl.split('?')[0];
          newProfile.optStatus.optI983 = 'Pending';
        }
        if (name === 'I20') {
          newProfile.optFiles.optI20 = fileUploadUrl.split('?')[0];
          newProfile.optStatus.optI20 = 'Pending';
        }
        this.profileService
          .updateProfile(newProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('File successfully updated');
              const user = { ...this.user };
              user.profile = newProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
      });
  }
}
