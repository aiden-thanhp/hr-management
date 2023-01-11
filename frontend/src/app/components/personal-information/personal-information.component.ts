import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectUser } from 'src/app/store/user/user.selector';
import { Store } from '@ngrx/store';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UserAction } from 'src/app/store/user/user.actions';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent implements OnInit {
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
  nameEdit: boolean = false;
  addressEdit: boolean = false;
  contactEdit: boolean = false;
  employmentEdit: boolean = false;
  emergencyEdit: boolean = false;
  user: any;
  target: string = '';
  fileObj: any;

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    preferredName: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    apartment: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    workPhone: new FormControl(''),
    visaTitle: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    emergencyFirstName: new FormControl('', [Validators.required]),
    emergencyMiddleName: new FormControl('', [Validators.required]),
    emergencyLastName: new FormControl('', [Validators.required]),
    emergencyPhone: new FormControl('', [Validators.required]),
    emergencyEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      this.emailValidator,
    ]),
    emergencyRelationship: new FormControl('', [Validators.required]),
    emergency2FirstName: new FormControl(''),
    emergency2MiddleName: new FormControl(''),
    emergency2LastName: new FormControl(''),
    emergency2Phone: new FormControl(''),
    emergency2Email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      this.emailValidator,
    ]),
    emergency2Relationship: new FormControl(''),
    driverLicense: new FormControl(''),
  });

  constructor(
    private store: Store,
    private profileService: ProfileService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (this.user.profile) {
        const addresses = this.user.profile.address.split('/');
        this.profileForm.patchValue({
          firstName: this.user.profile.firstName,
          middleName: this.user.profile.middleName,
          lastName: this.user.profile.lastName,
          preferredName: this.user.profile.preferredName,
          address: addresses[0],
          apartment: addresses[1] || '',
          city: addresses[2],
          state: addresses[3],
          zipcode: addresses[4],
          phone: this.user.profile.phone,
          workPhone: this.user.profile.workPhone,
          emergencyFirstName: this.user.profile.emergencyContacts[0].firstName,
          emergencyMiddleName:
            this.user.profile.emergencyContacts[0].middleName,
          emergencyLastName: this.user.profile.emergencyContacts[0].lastName,
          emergencyPhone: this.user.profile.emergencyContacts[0].phone,
          emergencyEmail: this.user.profile.emergencyContacts[0].email,
          emergencyRelationship:
            this.user.profile.emergencyContacts[0].relationship,
          emergency2FirstName: this.user.profile.emergencyContacts[1].firstName,
          emergency2MiddleName:
            this.user.profile.emergencyContacts[1].middleName,
          emergency2LastName: this.user.profile.emergencyContacts[1].lastName,
          emergency2Phone: this.user.profile.emergencyContacts[1].phone,
          emergency2Email: this.user.profile.emergencyContacts[1].email,
          emergency2Relationship:
            this.user.profile.emergencyContacts[1].relationship,
          driverLicense: this.user.profile.driverLicense.file,
        });
      }
    });
  }

  // custom validators

  emailValidator(control: FormControl) {
    if (control.value.length === 0) {
      return null;
    } else if (control.value.length < 10 || control.value.length > 40) {
      return { emailValidator: true };
    } else {
      return null;
    }
  }

  // Store input value when click edit button

  nameValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
  };

  addressValues = {
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
  };

  contactValues = {
    phone: '',
    workPhone: '',
  };

  employmentValues = {
    visaTitle: '',
    startDate: '',
    endDate: '',
  };

  emgencyValues = {
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
  };

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
    console.log(this.fileObj);
  }
  onFileUpload(event: Event) {
    event.preventDefault();
    if (!this.fileObj) {
      return;
    }
    this.fileUploadService
      .getPresignedUrl(this.fileObj.name, this.fileObj.type)
      .subscribe((res: any) => {
        console.log(res);
        const fileUploadUrl = res.data;
        this.fileUploadService
          .uploadfileAWSS3(fileUploadUrl, this.fileObj?.type, this.fileObj)
          .subscribe();

        const newProfile = { ...this.user.profile };
        newProfile.profilePicture = fileUploadUrl.split('?')[0];

        this.profileService
          .updateProfile(newProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('Profile image successfully updated');
              const user = { ...this.user };
              user.profile = newProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
      });
  }

  targetChange(section: string): void {
    this.target = section;
  }

  edit(section: string): void {
    switch (section) {
      case 'name':
        this.nameEdit = true;
        this.nameValues.firstName =
          this.profileForm.get('firstName')?.value || '';
        this.nameValues.middleName =
          this.profileForm.get('middleName')?.value || '';
        this.nameValues.lastName =
          this.profileForm.get('lastName')?.value || '';
        this.nameValues.preferredName =
          this.profileForm.get('preferredName')?.value || '';
        break;
      case 'address':
        this.addressEdit = true;
        this.addressValues.address =
          this.profileForm.get('address')?.value || '';
        this.addressValues.apartment =
          this.profileForm.get('apartment')?.value || '';
        this.addressValues.city = this.profileForm.get('city')?.value || '';
        this.addressValues.state = this.profileForm.get('state')?.value || '';
        this.addressValues.zipcode =
          this.profileForm.get('zipcode')?.value || '';
        break;
      case 'contact':
        this.contactEdit = true;
        this.contactValues.phone = this.profileForm.get('phone')?.value || '';
        this.contactValues.workPhone =
          this.profileForm.get('workPhone')?.value || '';
        break;
      case 'employment':
        this.employmentEdit = true;
        this.employmentValues.visaTitle =
          this.profileForm.get('visaTitle')?.value || '';
        this.employmentValues.startDate =
          this.profileForm.get('startDate')?.value || '';
        this.employmentValues.endDate =
          this.profileForm.get('endDate')?.value || '';
        break;
      case 'emergency':
        this.emergencyEdit = true;
        this.emgencyValues.emergencyFirstName =
          this.profileForm.get('emergencyFirstName')?.value || '';
        this.emgencyValues.emergencyMiddleName =
          this.profileForm.get('emergencyMiddleName')?.value || '';
        this.emgencyValues.emergencyLastName =
          this.profileForm.get('emergencyLastName')?.value || '';
        this.emgencyValues.emergencyPhone =
          this.profileForm.get('emergencyPhone')?.value || '';
        this.emgencyValues.emergencyEmail =
          this.profileForm.get('emergencyEmail')?.value || '';
        this.emgencyValues.emergencyRelationship =
          this.profileForm.get('emergencyRelationship')?.value || '';
        this.emgencyValues.emergency2FirstName =
          this.profileForm.get('emergency2FirstName')?.value || '';
        this.emgencyValues.emergency2MiddleName =
          this.profileForm.get('emergency2MiddleName')?.value || '';
        this.emgencyValues.emergency2LastName =
          this.profileForm.get('emergency2LastName')?.value || '';
        this.emgencyValues.emergency2Phone =
          this.profileForm.get('emergency2Phone')?.value || '';
        this.emgencyValues.emergency2Email =
          this.profileForm.get('emergency2Email')?.value || '';
        this.emgencyValues.emergency2Relationship =
          this.profileForm.get('emergency2Relationship')?.value || '';
        break;
    }
  }

  // restore to the inital value

  cancel(): void {
    switch (this.target) {
      case 'name':
        this.nameEdit = false;
        this.toastr.warning('Discard name field changes');
        this.profileForm.patchValue({
          firstName: this.nameValues.firstName,
          middleName: this.nameValues.middleName,
          lastName: this.nameValues.lastName,
          preferredName: this.nameValues.preferredName,
        });
        break;
      case 'address':
        this.addressEdit = false;
        this.toastr.warning('Discard address field changes');
        this.profileForm.patchValue({
          address: this.addressValues.address,
          apartment: this.addressValues.apartment,
          city: this.addressValues.city,
          state: this.addressValues.state,
          zipcode: this.addressValues.zipcode,
        });
        break;
      case 'contact':
        this.contactEdit = false;
        this.toastr.warning('Discard contact field changes');
        this.profileForm.patchValue({
          phone: this.contactValues.phone,
          workPhone: this.contactValues.workPhone,
        });
        break;
      case 'employment':
        this.employmentEdit = false;
        this.toastr.warning('Discard employment field changes');
        this.profileForm.patchValue({
          visaTitle: this.employmentValues.visaTitle,
          startDate: this.employmentValues.startDate,
          endDate: this.employmentValues.endDate,
        });
        break;
      case 'emergency':
        this.emergencyEdit = false;
        this.toastr.warning('Discard emergency field changes');
        this.profileForm.patchValue({
          emergencyFirstName: this.emgencyValues.emergencyFirstName,
          emergencyMiddleName: this.emgencyValues.emergencyMiddleName,
          emergencyLastName: this.emgencyValues.emergencyLastName,
          emergencyPhone: this.emgencyValues.emergencyPhone,
          emergencyEmail: this.emgencyValues.emergencyEmail,
          emergencyRelationship: this.emgencyValues.emergencyRelationship,
          emergency2FirstName: this.emgencyValues.emergency2FirstName,
          emergency2MiddleName: this.emgencyValues.emergency2MiddleName,
          emergency2LastName: this.emgencyValues.emergency2LastName,
          emergency2Phone: this.emgencyValues.emergency2Phone,
          emergency2Email: this.emgencyValues.emergency2Email,
          emergency2Relationship: this.emgencyValues.emergency2Relationship,
        });
        break;
    }
  }

  save(section: string): void {
    switch (section) {
      case 'name':
        if (
          !this.profileForm?.get('firstName')?.valid ||
          !this.profileForm?.get('lastName')?.valid
        ) {
          this.toastr.error('Name field inputs are invalid');
          return;
        }
        this.nameEdit = false;
        const nameProfile = { ...this.user.profile };
        nameProfile.firstName = this.profileForm.get('firstName')?.value;
        nameProfile.middleName = this.profileForm.get('middleName')?.value;
        nameProfile.lastName = this.profileForm.get('lastName')?.value;
        nameProfile.preferredName =
          this.profileForm.get('preferredName')?.value;
        this.profileService
          .updateProfile(nameProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('Name field was successfully updated');
              const user = { ...this.user };
              user.profile = nameProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
        break;
      case 'address':
        if (
          !this.profileForm?.get('address')?.valid ||
          !this.profileForm?.get('city')?.valid ||
          !this.profileForm?.get('state')?.valid ||
          !this.profileForm?.get('zipcode')?.valid
        ) {
          this.toastr.error('Address field inputs are invalid');
          return;
        }
        this.addressEdit = false;
        const addressProfile = { ...this.user.profile };
        const address = `${this.profileForm.get('address')?.value}/${
          this.profileForm.get('apartment')?.value
        }/${this.profileForm.get('city')?.value}/${
          this.profileForm.get('state')?.value
        }/${this.profileForm.get('zipcode')?.value}`;
        addressProfile.address = address;
        this.profileService
          .updateProfile(addressProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('Address field was successfully updated');
              const user = { ...this.user };
              user.profile = addressProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
        break;
      case 'contact':
        if (!this.profileForm?.get('phone')?.valid) {
          this.toastr.error('Contact field inputs are invalid');
          return;
        }
        this.contactEdit = false;
        const contactProfile = { ...this.user.profile };
        contactProfile.phone = this.profileForm.get('phone')?.value;
        contactProfile.workPhone = this.profileForm.get('workPhone')?.value;
        this.profileService
          .updateProfile(contactProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('Contact field was successfully updated');
              const user = { ...this.user };
              user.profile = contactProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
        break;
      case 'employment':
        this.employmentEdit = false;
        const employmentProfile = { ...this.user.profile };
        employmentProfile.visaTitle = this.profileForm.get('visaTitle')?.value;
        employmentProfile.startDate = this.profileForm.get('startDate')?.value;
        employmentProfile.startDate = this.profileForm.get('endDate')?.value;
        this.profileService
          .updateProfile(employmentProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success('Employment field was successfully updated');
              const user = { ...this.user };
              user.profile = employmentProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
        break;
      case 'emergency':
        if (
          !this.profileForm?.get('emergencyFirstName')?.valid ||
          !this.profileForm?.get('emergencyLastName')?.valid ||
          !this.profileForm?.get('emergencyPhone')?.valid ||
          !this.profileForm?.get('emergencyEmail')?.valid ||
          !this.profileForm?.get('emergencyRelationship')?.valid
        ) {
          this.toastr.error('Emergency field inputs are invalid');
          return;
        }
        this.emergencyEdit = false;
        const emergencyProfile = { ...this.user.profile };
        emergencyProfile.emergencyContacts = [
          ...this.user.profile.emergencyContacts,
        ];
        const emergency1 = {
          firstName: this.profileForm.get('emergencyFirstName')?.value,
          middleName: this.profileForm.get('emergencyMiddleName')?.value,
          lastName: this.profileForm.get('emergencyLastName')?.value,
          phone: this.profileForm.get('emergencyPhone')?.value,
          email: this.profileForm.get('emergencyEmail')?.value,
          relationship: this.profileForm.get('emergencyRelationship')?.value,
        };
        const emergency2 = {
          firstName: this.profileForm.get('emergency2FirstName')?.value,
          middleName: this.profileForm.get('emergency2MiddleName')?.value,
          lastName: this.profileForm.get('emergency2LastName')?.value,
          phone: this.profileForm.get('emergency2Phone')?.value,
          email: this.profileForm.get('emergency2Email')?.value,
          relationship: this.profileForm.get('emergency2Relationship')?.value,
        };
        emergencyProfile.emergencyContacts[0] = emergency1;
        emergencyProfile.emergencyContacts[1] = emergency2;

        this.profileService
          .updateProfile(emergencyProfile, this.user.profile._id)
          .subscribe((data) => {
            if (data.success) {
              this.toastr.success(
                'Emergency contact field was successfully updated'
              );
              const user = { ...this.user };
              user.profile = emergencyProfile;
              this.store.dispatch(UserAction.updateUser({ user }));
            }
          });
        break;
    }
  }
}
