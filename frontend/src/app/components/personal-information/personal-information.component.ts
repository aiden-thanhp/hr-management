import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectUser } from 'src/app/store/user/user.selector';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

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
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    preferredName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    apartment: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    cellphone: new FormControl('', [Validators.required]),
    workphone: new FormControl('', [Validators.required]),
    visaTitle: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    emergencyFirstName: new FormControl('', [Validators.required]),
    emergencyMiddleName: new FormControl('', [Validators.required]),
    emergencyLastName: new FormControl('', [Validators.required]),
    emergencyPhone: new FormControl('', [Validators.required]),
    emergencyEmail: new FormControl('', [Validators.required]),
    emergencyRelationship: new FormControl('', [Validators.required]),
    emergency2FirstName: new FormControl('', [Validators.required]),
    emergency2MiddleName: new FormControl('', [Validators.required]),
    emergency2LastName: new FormControl('', [Validators.required]),
    emergency2Phone: new FormControl('', [Validators.required]),
    emergency2Email: new FormControl('', [Validators.required]),
    emergency2Relationship: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      console.log(this.user.profile);
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
          cellphone: this.user.profile.phone,
          workphone: this.user.profile.workPhone,
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
        });
      }
    });
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
    cellphone: '',
    workphone: '',
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
        this.contactValues.cellphone =
          this.profileForm.get('cellPhoneNum')?.value || '';
        this.contactValues.workphone =
          this.profileForm.get('workphone')?.value || '';
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

  cancel(section: string): void {
    switch (section) {
      case 'name':
        this.nameEdit = false;
        alert('discard all changes?');
        this.profileForm.patchValue({
          firstName: this.nameValues.firstName,
          middleName: this.nameValues.middleName,
          lastName: this.nameValues.lastName,
          preferredName: this.nameValues.preferredName,
        });
        break;
      case 'address':
        this.addressEdit = false;
        alert('discard all changes?');
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
        alert('discard all changes?');
        this.profileForm.patchValue({
          cellphone: this.contactValues.cellphone,
          workphone: this.contactValues.workphone,
        });
        break;
      case 'employment':
        this.employmentEdit = false;
        alert('discard all changes?');
        this.profileForm.patchValue({
          visaTitle: this.employmentValues.visaTitle,
          startDate: this.employmentValues.startDate,
          endDate: this.employmentValues.endDate,
        });
        break;
      case 'emergency':
        this.emergencyEdit = false;
        alert('discard all changes?');
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
}
