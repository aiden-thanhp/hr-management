import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  states: String[] = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

  constructor(private fileUploadService: FileUploadService) { }

  fileObj: File | undefined;
  fileUrl: string = '';
  optReceipt: String = '';
  driverLicense: String = '';
  profilePicture: String = '';
  
  onFilePicked(event: Event): void {
    const target = event.target as HTMLInputElement;
    const FILE = (target.files as FileList)[0];
    this.fileObj = FILE;
  }
  
  onFileUpload(event: Event) {
    event.preventDefault();
    const name = (event.target as HTMLElement).getAttribute("id");

    if (!this.fileObj) {
      return;
    }
    this.fileUploadService.getPresignedUrl(this.fileObj.name, this.fileObj.type)
      .subscribe((res: any) => {
        const fileUploadUrl = res.data;
        this.fileUploadService.uploadfileAWSS3(fileUploadUrl, this.fileObj?.type, this.fileObj).subscribe()
        
        if (name == "optReceipt") {
          this.optReceipt = fileUploadUrl.split('?')[0];
          document.getElementById("opt-success")?.classList.remove('d-none');
        } else if (name == "number") {
          this.driverLicense = fileUploadUrl.split('?')[0];
          document.getElementById("dl-success")?.classList.remove('d-none');
        } else if (name == "profilePicture") {
          this.profilePicture = fileUploadUrl.split('?')[0];
          document.getElementById("pp-success")?.classList.remove('d-none');
        }
      }, (error: any) => {
        console.log(error)
      })
  }

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
    email: '',
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
    emergency2Relationship: ''
  });

  onSubmit(): void {
    // Get the email from registration >> get User info from the Ngrx Store

    // Add the user email into the profile Form

    let hasError = false;
    Object.keys(this.onboardingForm.controls).forEach(field => {
      if (this.onboardingForm.get(field)?.errors) {
        hasError = true;
        console.log(field, this.onboardingForm.get(field)?.errors)
      };
    })

    if (!hasError) {
      const address = `${this.onboardingForm.controls.address.value} ${this.onboardingForm.controls.apartment.value} ${this.onboardingForm.controls.city.value}, ${this.onboardingForm.controls.state.value}, ${this.onboardingForm.controls.zipcode.value}`;
      const residency = this.onboardingForm.controls.isResident.value == "Yes" ? this.onboardingForm.controls.residentType.value : "Non-resident";
      const nonResidentType = this.onboardingForm.controls.nonResidentType.value != "Other" ? this.onboardingForm.controls.nonResidentType.value : this.onboardingForm.controls.otherVisaType.value;
      const emergencyContacts = [
        {
          firstName: this.onboardingForm.controls.emergencyFirstName.value,
          lastName: this.onboardingForm.controls.emergencyLastName.value,
          middleName: this.onboardingForm.controls.emergencyMiddleName.value,
          phone: this.onboardingForm.controls.emergencyPhone.value,
          email: this.onboardingForm.controls.emergencyEmail.value,
          relationship: this.onboardingForm.controls.emergencyRelationship.value
        },
        {
          firstName: this.onboardingForm.controls.emergency2FirstName.value,
          lastName: this.onboardingForm.controls.emergency2LastName.value,
          middleName: this.onboardingForm.controls.emergency2MiddleName.value,
          phone: this.onboardingForm.controls.emergency2Phone.value,
          email: this.onboardingForm.controls.emergency2Email.value,
          relationship: this.onboardingForm.controls.emergency2Relationship.value
        }
      ]
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
        email: this.onboardingForm.controls.email.value,
        ssn: this.onboardingForm.controls.ssn.value,
        dob: this.onboardingForm.controls.dob.value,
        gender: this.onboardingForm.controls.gender.value,
        residency: residency,
        workAuthorization: {
          type: nonResidentType,
          startDate: this.onboardingForm.controls.visaStartDate.value,
          endDate: this.onboardingForm.controls.visaEndDate.value
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
          relationship: this.onboardingForm.controls.referenceRelationship.value
        },
        emergencyContacts: emergencyContacts,
        onboardingStatus: "Pending",
        optFiles: {
          optReceipt: this.optReceipt,
          optEAD: "",
          optI983: "",
          optI20: ""
        },
        optStatus: {
          optReceipt: false,
          optEAD: false,
          optI983: false,
          optI20: false
        }
      }
      console.log(newProfile)

      // Make a request to create a new Profile;
      // req.body : { newProfile, userId }
    } else {
      console.log("error")
    }
  }
}
