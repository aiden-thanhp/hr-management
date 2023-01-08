import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() {}

  ngOnInit(): void {}

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    preferredName: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    buildingAptNum: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    cellPhoneNum: new FormControl('', [Validators.required]),
    workPhoneNum: new FormControl('', [Validators.required]),
    visaTitle: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    efirstName: new FormControl('', [Validators.required]),
    emiddleName: new FormControl('', [Validators.required]),
    elastName: new FormControl('', [Validators.required]),
    ecellPhoneNum: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    relationship: new FormControl('', [Validators.required]),
  });

  // Store input value when click edit button

  nameValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
  };

  addressValues = {
    streetName: '',
    buildingAptNum: '',
    city: '',
    state: '',
    zip: '',
  };

  contactValues = {
    cellPhoneNum: '',
    workPhoneNum: '',
  };

  employmentValues = {
    visaTitle: '',
    startDate: '',
    endDate: '',
  };

  emgencyValues = {
    efirstName: '',
    emiddleName: '',
    elastName: '',
    ecellPhoneNum: '',
    email: '',
    relationship: '',
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
        this.addressValues.streetName =
          this.profileForm.get('streetName')?.value || '';
        this.addressValues.buildingAptNum =
          this.profileForm.get('buildingAptNum')?.value || '';
        this.addressValues.city = this.profileForm.get('city')?.value || '';
        this.addressValues.state = this.profileForm.get('state')?.value || '';
        this.addressValues.zip = this.profileForm.get('zip')?.value || '';
        break;
      case 'contact':
        this.contactEdit = true;
        this.contactValues.cellPhoneNum =
          this.profileForm.get('cellPhoneNum')?.value || '';
        this.contactValues.workPhoneNum =
          this.profileForm.get('workPhoneNum')?.value || '';
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
        this.emgencyValues.efirstName =
          this.profileForm.get('efirstName')?.value || '';
        this.emgencyValues.emiddleName =
          this.profileForm.get('emiddleName')?.value || '';
        this.emgencyValues.elastName =
          this.profileForm.get('elastName')?.value || '';
        this.emgencyValues.ecellPhoneNum =
          this.profileForm.get('ecellPhoneNum')?.value || '';
        this.emgencyValues.email = this.profileForm.get('email')?.value || '';
        this.emgencyValues.relationship =
          this.profileForm.get('relationship')?.value || '';
        break;
    }
  }

  cancel(section: string): void {
    switch (section) {
      case 'name':
        this.nameEdit = false;
        this.profileForm.patchValue({
          firstName: this.nameValues.firstName,
          middleName: this.nameValues.middleName,
          lastName: this.nameValues.lastName,
          preferredName: this.nameValues.preferredName,
        });
        break;
      case 'address':
        this.addressEdit = false;
        this.profileForm.patchValue({
          streetName: this.addressValues.streetName,
          buildingAptNum: this.addressValues.buildingAptNum,
          city: this.addressValues.city,
          state: this.addressValues.state,
          zip: this.addressValues.zip,
        });
        break;
      case 'contact':
        this.contactEdit = false;
        this.profileForm.patchValue({
          cellPhoneNum: this.contactValues.cellPhoneNum,
          workPhoneNum: this.contactValues.workPhoneNum,
        });
        break;
      case 'employment':
        this.employmentEdit = false;
        this.profileForm.patchValue({
          visaTitle: this.employmentValues.visaTitle,
          startDate: this.employmentValues.startDate,
          endDate: this.employmentValues.endDate,
        });
        break;
      case 'emergency':
        this.emergencyEdit = false;
        this.profileForm.patchValue({
          efirstName: this.emgencyValues.efirstName,
          emiddleName: this.emgencyValues.emiddleName,
          elastName: this.emgencyValues.elastName,
          ecellPhoneNum: this.emgencyValues.ecellPhoneNum,
          email: this.emgencyValues.email,
          relationship: this.emgencyValues.relationship,
        });
        break;
    }
  }
}
