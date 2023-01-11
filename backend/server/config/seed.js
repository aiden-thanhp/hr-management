const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { DATABASE_URL } = process.env;
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const House = require("../models/House");
const RegistrationToken = require("../models/RegistrationToken");
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');
const Report = require('../models/Report');

async function run() {
  console.log(DATABASE_URL)
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to DB.");

    await Promise.all([
      User.collection.drop(),
      House.collection.drop(),
      RegistrationToken.collection.drop(),
      Comment.collection.drop(),
      Report.collection.drop(),
      Profile.collection.drop(),
    ]);

    const pass = await bcrypt.hash("admin1Pass@", Number(process.env.SALT));
    const pass2 = await bcrypt.hash("Asd111...", Number(process.env.SALT));
    const users = [
      {
        username: "admin1",
        password: pass,
        email: "admin1@gmail.com",
        isHR: true,
      },
      {
        username: "user1",
        password: pass2,
        email: "user1@gmail.com",
        isHR: false,
      },
    ];
    const createdUsers = await User.create(users);
    console.log("createdUsers = ", createdUsers);
    const testProfile = {
      firstName: "Test First",
        lastName: "Test Last",
        middleName: "",
        preferredName:  "Test Preferred",
        car: {
          make: "Maketest",
          model: "Modeltest",
          color: "Colortest",
        },
        email: "user1@gmail.com",
        address: '45 Gabriel Trail',
        phone: '9991991999',
        ssn: '1111111111',
        dob: new Date(),
        gender: 'Male',
        residency: 'Citizen'
    }
    const createdProfile = await Profile.create(testProfile);
    await User.findOneAndUpdate({username: "user1"}, {profile: createdProfile})

    const houses = [
      {
        address: "123 This Street, That City, AB, 12345",
        landlord: {
          name: "Junbeom Chun",
          phone: "1234567890",
          email: "junchun@gmail.com",
        },
        facility: {
          beds: 2,
          mattress: 4,
          tables: 3,
          chairs: 6,
        },
        residents: [],
        reports: []
      },
      {
        address: "321 Another Street, Different City, NA, 54321",
        landlord: {
          name: "Yizhou Wu",
          phone: "3126540987",
          email: "yizhouwu@gmail.com",
        },
        facility: {
          beds: 3,
          mattress: 6,
          tables: 8,
          chairs: 12,
        },
        residents: [],
        reports: []
      },
    ];

    const createdHouse = await House.create(houses);
    console.log("createdHouse = ", createdHouse);

    const comments = [
      {
        description: "Desciption Test1 by user1",
        createdBy:'user1'
      },
      {
        description: "This report is now working",
        createdBy:'admin1'
      },
      {
        description: "Description Test2 by user1",
        createdBy:'user1'
      },
    ];
    await Comment.create(comments);
    const user1 = await User.findOne({ username: "user1" });
    const comment1 = await Comment.findOne({
      description: "Desciption Test1 by user1",
    });
    const comment1_1 = await Comment.findOne({
      description: "This report is now working",
    })
    const comment2 = await Comment.findOne({
      description: "Description Test2 by user1",
    });
    const reports = [
      {
        title: "Bed is broken",
        description: "Bed is broken is now working",
        status: "Open",
        createdBy: user1,
        comments: [comment1, comment1_1],
      },
      {
        title: "Table is broken",
        description: "Table is broken description test",
        status: "Open",
        createdBy: user1,
        comments: [comment2],
      },
    ];
    await Report.create(reports);
    const report1 = await Report.findOne({title: "Bed is broken"});
    const report2 = await Report.findOne({title: "Table is broken"});
    const house1 = await House.findOneAndUpdate({
      address: "123 This Street, That City, AB, 12345",
    }, {
      reports: [report1, report2],
      residents: [user1]
    });
    await User.findOneAndUpdate({username: "user1"}, {house: house1});
  } catch (error) {
    console.log("seed.js error = ", error);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
