import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent implements OnInit {
  nameEdit: boolean = true;
  addressEdit: boolean = true;
  contactEdit: boolean = true;
  employmentEdit: boolean = true;
  emergencyEdit: boolean = true;

  constructor(private elrf: ElementRef) {}

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

  nameValues = {};

  edit(section: string): void {
    switch (section) {
      case 'name':
        this.nameEdit = !this.nameEdit;
        break;
      case 'address':
        this.addressEdit = !this.addressEdit;
        break;
      case 'contact':
        this.contactEdit = !this.contactEdit;
        break;
      case 'employment':
        this.employmentEdit = !this.employmentEdit;
        break;
      case 'emergency':
        this.emergencyEdit = !this.emergencyEdit;
        break;
    }
  }
}
