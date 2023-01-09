import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute, private profileService: ProfileService) {}

  profileId = this.route.snapshot.params['profileId']
  profile: any;

  approvalForm = new FormBuilder().group({
    message: ''
  });

  ngOnInit(): void {
    this.profileService.getProfileById(this.profileId)
      .subscribe((response: any) => {
        this.profile = response.data
      })
  }

  onApprove(): void {
    this.profile.comment = this.approvalForm.get('message')?.value;
    this.profile.onboardingStatus = "Approved";

    this.profileService.updateProfile(this.profile, this.profile._id)
      .subscribe((data: any) => {})
  };

  onReject(): void {
    this.profile.comment = this.approvalForm.get('message')?.value;
    this.profile.onboardingStatus = "Rejected";

    this.profileService.updateProfile(this.profile, this.profile._id)
      .subscribe((data: any) => {})
  }
}
