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
  
  onFilePicked(event: Event): void {
    const target = event.target as HTMLInputElement;
    const FILE = (target.files as FileList)[0];
    this.fileObj = FILE;
  }
  
  onFileUpload(event: Event) {
    event.preventDefault();
    if (!this.fileObj) {
      return;
    }
    this.fileUploadService.getPresignedUrl(this.fileObj.name, this.fileObj.type)
      .subscribe((res: any) => {
        const fileUploadUrl = res.data;
        this.fileUploadService.uploadfileAWSS3(fileUploadUrl, this.fileObj?.type, this.fileObj).subscribe()
        console.log(fileUploadUrl.split('?')[0])
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
    console.log(this.onboardingForm.getRawValue())
  }
}
