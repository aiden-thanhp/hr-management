import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProfileService } from 'src/app/services/profile.service';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  states: String[] = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  constructor(
    private fileUploadService: FileUploadService,
    private store: Store,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  user: any;
  fileObj: File | undefined;
  fileUrl: string = '';
  optReceipt: string = '';
  driverLicense: string = '';
  profilePicture: string = '';
  regEmail: string = '';
  disableSelect = false;

  onboardingForm = new FormBuilder().group({
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    profilePicture: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
    cellphone: '',
    workphone: '',
    carMake: '',
    carModel: '',
    carColor: '',
    isResident: '',
    ssn: '',
    dob: Date,
    gender: '',
    residentType: '',
    nonResidentType: '',
    otherVisaType: '',
    optReceipt: '',
    visaStartDate: Date,
    visaEndDate: Date,
    hasDriverLicense: '',
    driverLicense: '',
    driverLicenseExp: Date,
    driverLicenseFile: '',
    referenceFirstName: '',
    referenceMiddleName: '',
    referenceLastName: '',
    referencePhone: '',
    referenceEmail: '',
    referenceRelationship: '',
    emergencyFirstName: '',
    emergencyMiddleName: '',
    emergencyLastName: '',
    emergencyPhone: '',
    emergencyEmail: '',
    emergencyRelationship: '',
    emergency2FirstName: '',
    emergency2MiddleName: '',
    emergency2LastName: '',
    emergency2Phone: '',
    emergency2Email: '',
    emergency2Relationship: '',
  });

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user: any) => {
      if (user.id) {
        console.log(user);
        this.user = user;

        this.regEmail = this.user.registerToken.email;
        if (this.user?.profile?._id) {
          this.optReceipt = this.user.profile.optFiles.optReceipt || '';
          this.driverLicense =
            this.user.profile.driverLicense.driverLicenseFile || '';
          this.profilePicture = this.user.profile.profilePicture || '';
          const addresses = this.user.profile.address.split('/');
          this.onboardingForm.setValue({
            firstName: this.user.profile.firstName,
            lastName: this.user.profile.lastName,
            middleName: this.user.profile.middleName,
            preferredName: this.user.profile.preferredName,
            profilePicture: '',
            address: addresses[0],
            apartment: addresses[1] || '',
            city: addresses[2],
            state: addresses[3],
            zipcode: addresses[4],
            cellphone: this.user.profile.phone,
            workphone: this.user.profile.workPhone,
            carMake: this.user.profile.car.make,
            carModel: this.user.profile.car.model,
            carColor: this.user.profile.car.color,
            isResident:
              this.user.profile.residency == 'Non-resident' ? 'No' : 'Yes',
            ssn: this.user.profile.ssn,
            dob: this.user.profile.dob?.split('T')[0],
            gender: this.user.profile.gender,
            residentType:
              this.user.profile.residency == 'Non-resident'
                ? ''
                : this.user.profile.residency,
            nonResidentType:
              this.user.profile.residency != 'Non-resident'
                ? 'NA'
                : ['H1B', 'L2', 'H4'].includes(
                    this.user.profile.workAuthorization.visaType
                  )
                ? this.user.profile.workAuthorization.visaType
                : 'Other',
            otherVisaType:
              this.user.profile.residency != 'Non-resident'
                ? 'NA'
                : !['H1B', 'L2', 'H4'].includes(
                    this.user.profile.workAuthorization.visaType
                  )
                ? this.user.profile.workAuthorization.visaType
                : '',
            optReceipt: '',
            visaStartDate:
              this.user.profile.workAuthorization.startDate?.split('T')[0] ||
              Date,
            visaEndDate:
              this.user.profile.workAuthorization.endDate?.split('T')[0] ||
              Date,
            hasDriverLicense:
              this.user.profile.driverLicense.number != '' ? 'Yes' : 'No',
            driverLicense: this.user.profile.driverLicense.number,
            driverLicenseExp:
              this.user.profile.driverLicense.expiration?.split('T')[0] || Date,
            driverLicenseFile: '',
            referenceFirstName: this.user.profile.reference.firstName,
            referenceMiddleName: this.user.profile.reference.middleName,
            referenceLastName: this.user.profile.reference.lastName,
            referencePhone: this.user.profile.reference.phone,
            referenceEmail: this.user.profile.reference.email,
            referenceRelationship: this.user.profile.reference.relationship,
            emergencyFirstName:
              this.user.profile.emergencyContacts[0].firstName,
            emergencyMiddleName:
              this.user.profile.emergencyContacts[0].middleName,
            emergencyLastName: this.user.profile.emergencyContacts[0].lastName,
            emergencyPhone: this.user.profile.emergencyContacts[0].phone,
            emergencyEmail: this.user.profile.emergencyContacts[0].email,
            emergencyRelationship:
              this.user.profile.emergencyContacts[0].relationship,
            emergency2FirstName:
              this.user.profile.emergencyContacts[1].firstName,
            emergency2MiddleName:
              this.user.profile.emergencyContacts[1].middleName,
            emergency2LastName: this.user.profile.emergencyContacts[1].lastName,
            emergency2Phone: this.user.profile.emergencyContacts[1].phone,
            emergency2Email: this.user.profile.emergencyContacts[1].email,
            emergency2Relationship:
              this.user.profile.emergencyContacts[1].relationship,
          });
          if (this.user.profile.onboardingStatus != 'Rejected')
            this.onboardingForm.disable();
        }
      }
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
      .subscribe(
        (res: any) => {
          const fileUploadUrl = res.data;
          this.fileUploadService
            .uploadfileAWSS3(fileUploadUrl, this.fileObj?.type, this.fileObj)
            .subscribe();

          if (name == 'optReceipt') {
            this.optReceipt = fileUploadUrl.split('?')[0];
            document.getElementById('opt-success')?.classList.remove('d-none');
          } else if (name == 'number') {
            this.driverLicense = fileUploadUrl.split('?')[0];
            document.getElementById('dl-success')?.classList.remove('d-none');
          } else if (name == 'profilePicture') {
            this.profilePicture = fileUploadUrl.split('?')[0];
            document.getElementById('pp-success')?.classList.remove('d-none');
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onSubmit(): void {
    // console.log(this.user.profile.firstName)

    let hasError = false;
    Object.keys(this.onboardingForm.controls).forEach((field) => {
      if (this.onboardingForm.get(field)?.errors) {
        hasError = true;
        console.log(field, this.onboardingForm.get(field)?.errors);
      }
    });

    if (!hasError) {
      const address = `${this.onboardingForm.controls.address.value}/${this.onboardingForm.controls.apartment.value}/${this.onboardingForm.controls.city.value}/${this.onboardingForm.controls.state.value}/${this.onboardingForm.controls.zipcode.value}`;
      const residency =
        this.onboardingForm.controls.isResident.value == 'Yes'
          ? this.onboardingForm.controls.residentType.value
          : 'Non-resident';
      const nonResidentType =
        this.onboardingForm.controls.nonResidentType.value != 'Other'
          ? this.onboardingForm.controls.nonResidentType.value
          : this.onboardingForm.controls.otherVisaType.value;
      const emergencyContacts = [
        {
          firstName: this.onboardingForm.controls.emergencyFirstName.value,
          lastName: this.onboardingForm.controls.emergencyLastName.value,
          middleName: this.onboardingForm.controls.emergencyMiddleName.value,
          phone: this.onboardingForm.controls.emergencyPhone.value,
          email: this.onboardingForm.controls.emergencyEmail.value,
          relationship:
            this.onboardingForm.controls.emergencyRelationship.value,
        },
        {
          firstName: this.onboardingForm.controls.emergency2FirstName.value,
          lastName: this.onboardingForm.controls.emergency2LastName.value,
          middleName: this.onboardingForm.controls.emergency2MiddleName.value,
          phone: this.onboardingForm.controls.emergency2Phone.value,
          email: this.onboardingForm.controls.emergency2Email.value,
          relationship:
            this.onboardingForm.controls.emergency2Relationship.value,
        },
      ];
      const newProfile = {
        firstName: this.onboardingForm.controls.firstName.value,
        lastName: this.onboardingForm.controls.lastName.value,
        middleName: this.onboardingForm.controls.middleName.value,
        preferredName: this.onboardingForm.controls.preferredName.value,
        profilePicture: this.profilePicture,
        address: address,
        phone: this.onboardingForm.controls.cellphone.value,
        workPhone: this.onboardingForm.controls.workphone.value,
        car: {
          make: this.onboardingForm.controls.carMake.value,
          model: this.onboardingForm.controls.carModel.value,
          color: this.onboardingForm.controls.carColor.value,
        },
        email: this.regEmail,
        ssn: this.onboardingForm.controls.ssn.value,
        dob: this.onboardingForm.controls.dob.value,
        gender: this.onboardingForm.controls.gender.value,
        residency: residency,
        workAuthorization: {
          visaType: nonResidentType,
          startDate: this.onboardingForm.controls.visaStartDate.value,
          endDate: this.onboardingForm.controls.visaEndDate.value,
        },
        driverLicense: {
          number: this.onboardingForm.controls.driverLicense.value,
          expiration: this.onboardingForm.controls.driverLicenseExp.value,
          file: this.driverLicense,
        },
        reference: {
          firstName: this.onboardingForm.controls.referenceFirstName.value,
          lastName: this.onboardingForm.controls.referenceLastName.value,
          middleName: this.onboardingForm.controls.referenceMiddleName.value,
          phone: this.onboardingForm.controls.referencePhone.value,
          email: this.onboardingForm.controls.referenceEmail.value,
          relationship:
            this.onboardingForm.controls.referenceRelationship.value,
        },
        emergencyContacts: emergencyContacts,
        onboardingStatus: 'Pending',
        optFiles: {
          optReceipt: this.optReceipt,
          optEAD: '',
          optI983: '',
          optI20: '',
        },
        optStatus: {
          optReceipt: 'Pending',
          optEAD: 'Never Submitted',
          optI983: 'Never Submitted',
          optI20: 'Never Submitted',
        },
        optComments: {
          optReceipt: '',
          optEAD: '',
          optI983: '',
          optI20: '',
        },
      };
      // Make a request to create a new Profile;

      if (
        this.user?.profile &&
        this.user?.profile?.onboardingStatus == 'Rejected'
      ) {
        this.profileService
          .updateProfile(newProfile, this.user?.profile?._id)
          .subscribe((response: any) => {
            console.log(response)
          });
          this.router.navigate(['/personalInformation'])
      } else {
        this.profileService
          .createProfile(newProfile, this.user?.id)
          .subscribe((response: any) => {
            console.log(response);
          });
        this.router.navigate(['/personalInformation'])
      };
    } else {
      this.toastr.error('Please fill all the required fields.');
      console.log('error');
    }
  }
}
