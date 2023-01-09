const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Profile firstName required'],
  },
  lastName: {
    type: String,
    required: [true, 'Profile lastName required'],
  },
  middleName: String,
  preferredName: String,
  profilePicture: String,
  address: {
      type: String, 
      required: [true, 'House address required'],
      validate: {
          validator: function(v) {
              return /^[0-9a-zA-Z ,-/]+$/.test(v);
          },
          message: props => `${props.value} is not a valid address!`
      }
  },
  phone: {
      type: String, 
      required: [true, 'Profile phone required'],
      validate: {
          validator: function(v) {
              return /^[0-9]{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
      }
  },
  workPhone: {
      type: String
  },
  car: {
      make: String,
      model: String,
      color: String
  },
  email: { 
      type: String, 
      required: [true, 'Profile email required'],
      validate: {
          validator: function(v) {
              return /^\S+@\S+\.\S+$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
      }
  },
  ssn: {
      type: String,
      required: [true, 'Profile SSN required'],
      validate: {
          validator: function(v) {
              return /^[0-9]{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid SSN!`
      }
  },
  dob: {
      type: Date,
      required: [true, 'Profile DOB required'],
  },
  gender: {
      type: String,
      required: [true, 'Profile gender required'],
      enum: ['Male', 'Female', 'NA']
  },
  residency: {
      type: String,
      required: [true, 'Profile residency required'],
      enum: ['Citizen', 'GC', 'Non-resident']
  },
  workAuthorization: {
      visaType: String,
      startDate: Date,
      endDate: Date
  },
  driverLicense: {
      number: String,
      expiration: Date,
      file: String
  },
  reference: {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String
  },
  emergencyContacts: [{
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String
  }],
  onboardingStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Never Submitted']
  },
  optStatus: {
      optReceipt: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected', 'Never Submitted']
      },
      optEAD: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected', 'Never Submitted']
      },
      optI983: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected', 'Never Submitted']
      },
      optI20: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected', 'Never Submitted']
      }
  },
  optFiles: {
      optReceipt: String,
      optEAD: String,
      optI983: String,
      optI20: String
  },
  optComments: {
      optReceipt: String,
      optEAD: String,
      optI983: String,
      optI20: String
  },
  comment: String,
  user: { type: refType, ref: "User" }
});

const Profile = mongoose.model('Profile', ProfileSchema, 'Profile');

module.exports = Profile;
