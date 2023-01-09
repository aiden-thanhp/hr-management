const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));
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
      Profile.collection.drop(),
      Report.collection.drop(),
    ]);

    const pass = await bcrypt.hash("admin1Pass@", Number(process.env.SALT));
    const users = [
      {
        username: "admin1",
        password: pass,
        email: "admin1@gmail.com",
        isHR: true,
      },
    ];
    const createdUsers = await User.create(users);
    console.log("createdUsers = ", createdUsers);

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
      },
    ];

    const createdHouse = await House.create(houses);
    console.log("createdHouse = ", createdHouse);
  } catch (error) {
    console.log("seed.js error = ", error);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
