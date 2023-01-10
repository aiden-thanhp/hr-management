import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { selectProfiles } from 'src/app/store/profiles/profiles.selector';

@Component({
  selector: 'app-hr-visa-management-page',
  templateUrl: './hr-visa-management-page.component.html',
  styleUrls: ['./hr-visa-management-page.component.css']
})
export class HrVisaManagementPageComponent implements OnInit {
  constructor(private store: Store, private profileService: ProfileService) {}

  userlist: any;
  onprogressList: any;
  searchText: string = '';
  profile: any;

  commentForm = new FormBuilder().group({
    comment: ''
  })

  ngOnInit(): void {
    this.store.select(selectProfiles)
      .subscribe((data:any) => {
        this.userlist = data;
        this.onprogressList = data?.filter((user: any) => user.profile?.workAuthorization.visaType == 'H1B')
        console.log(data)
      })
  }

  countDays(date: Date): number {
    const difference = (new Date(date).getTime() - new Date().getTime())/(1000*3600*24);
    return Math.round(difference)
  };

  viewProfile(profileId: string): void {
    window.open(`/profile/${profileId}`, '_blank')
  }

  onAccept(type: string, profile: any): void {
    if (type == 'receipt') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Never Submitted',
          optI983: 'Never Submitted',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: this.commentForm.get('comment')?.value || '',
          optEAD: '',
          optI983: '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'ead') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Approved',
          optI983: 'Never Submitted',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: '',
          optEAD: this.commentForm.get('comment')?.value || '',
          optI983: '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'i983') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Approved',
          optI983: 'Approved',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: '',
          optEAD: '',
          optI983: this.commentForm.get('comment')?.value || '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'i20') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Approved',
          optI983: 'Approved',
          optI20: 'Approved'
        },
        optComments: {
          optReceipt: '',
          optEAD: '',
          optI983: '',
          optI20: this.commentForm.get('comment')?.value || ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    };
  };

  onReject(type: string, profile: any): void {
    if (type == 'receipt') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Rejected',
          optEAD: 'Never Submitted',
          optI983: 'Never Submitted',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: this.commentForm.get('comment')?.value || '',
          optEAD: '',
          optI983: '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'ead') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Rejected',
          optI983: 'Never Submitted',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: '',
          optEAD: this.commentForm.get('comment')?.value || '',
          optI983: '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'i983') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Approved',
          optI983: 'Rejected',
          optI20: 'Never Submitted'
        },
        optComments: {
          optReceipt: '',
          optEAD: '',
          optI983: this.commentForm.get('comment')?.value || '',
          optI20: ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    } else if (type == 'i20') {
      this.profileService.updateProfile({
        optStatus: {
          optReceipt: 'Approved',
          optEAD: 'Approved',
          optI983: 'Approved',
          optI20: 'Rejected'
        },
        optComments: {
          optReceipt: '',
          optEAD: '',
          optI983: '',
          optI20: this.commentForm.get('comment')?.value || ''
        }
      }, profile._id)
        .subscribe((data: any) => {
          console.log(data)
        })
    };
  }

  onEmailSend(email: string, type: string, name: string): void {
    const subject = `Send your ${type} file ASAP on your portal`;
    const text = `Hi ${name}, we need your ${type} file as soon as possible to finish your profile.`
    this.profileService.onEmailSend(email, subject, text)
      .subscribe((data: any) => {
        console.log(data);
      })
  }
}
