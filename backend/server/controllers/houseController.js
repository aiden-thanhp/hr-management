const House = require("../models/House");
const Report = require("../models/Report");
const Comment = require("../models/Comment");
const Profile = require("../models/Profile")
const User = require("../models/User");

exports.get_house = async (req, res) => {
  try {
    const id = req.params._id;
    const house = await House.findOne({ _id: id })
      .populate({
        path: "residents",
        model: "User",
        populate: [
          {
            path: "profile",
            model: "Profile",
          },
        ],
      })
      .populate({
        path: "reports",
        model: "Report",
        populate: [
          {
            path: "comments",
            model: "Comment",
          },
          { path: "createdBy", model: "User" },
        ],
      });
    if (house) {
      for (let user of house.residents) {
        user.password = "";
      }
      res.status(200).json(house);
    } else {
      res.status(404).json({ message: "House doesn't exist" });
    }
  } catch (err) {
    res.status(404).json({ message: "House doesn't exist" });
    console.log(err);
  }
};
exports.get_houses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (err) {
    console.log(err);
  }
};
exports.add_house = async (req, res) => {
  try {
    const {
      address,
      landlordName,
      landlordPhone,
      landlordEmail,
      beds,
      mattress,
      tables,
      chairs,
    } = req.body;
    const newHouse = {
      address: address,
      landlord: {
        name: landlordName,
        phone: landlordPhone,
        email: landlordEmail,
      },
      facility: {
        beds: beds,
        mattress: mattress,
        tables: tables,
        chairs: chairs,
      },
      residents: [],
      reports: [],
    };
    await House.create(newHouse);
    res.status(201).json({ message: "New house created" });
  } catch (err) {
    console.log(err);
  }
};
exports.delete_house = async (req, res) => {
  try {
    const id = req.params.id;
    await House.findByIdAndDelete(id);
    res.status(200).json({ message: "House Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.get_report = async (req, res) => {
  try {
    const id = req.params.id;
    const report = await Report.findOne({_id: id})
    .populate('comments')
    .populate('createdBy');
    if(report) {
      report.createdBy.password = '';
      res.status(200).json(report);
    } else {
      res.status(404).json({message: 'Can\'t find the report'});
    }

  } catch (err) {
    res.status(404).json({message: 'Can\'t find the report'});
    console.log(err);
  }
};

exports.add_report = async (req, res) => {
  try {
    const { userID, houseID, title, description } = req.body;
    const user = await User.findById(userID);
    const house = await House.findById(houseID).populate("reports");
    const report = {
      title: title,
      description: description,
      status: "Open",
      createdBy: user,
      comments: [],
    };
    const newReport = await Report.create(report);
    const houseReports = house.reports;
    houseReports.push(newReport);
    const updatedHouse = await House.findOneAndUpdate(
      { _id: houseID },
      {
        reports: houseReports,
      },
      { new: true }
    );
    res.status(200).json(updatedHouse);
  } catch (err) {
    console.log(err);
  }
};
exports.add_comment = async (req, res) => {
  try {
    const { userID, reportID, description } = req.body;
    const user = await User.findById(userID);
    const report = await Report.findById(reportID).populate("comments");
    const comment = {
      description: description,
      createdBy: user.username,
    };
    const newComment = await Comment.create(comment);
    const reportComments = report.comments;
    reportComments.push(newComment);
    const updatedReport = await Report.findOneAndUpdate(
      { _id: reportID },
      {
        comments: reportComments,
      },
      { new: true }
    );
    res.status(200).json(updatedReport);
  } catch (err) {
    console.log(err);
  }
};
exports.change_status = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.params.id;
    const updatedReport = await Report.findOneAndUpdate(
      { _id: id },
      { status: status }
    );
    if (updatedReport) {
      res.status(200).json({ message: "Report Status Updated" });
    } else {
      res.status(404).json({ message: "Report Not Found" });
    }
  } catch (error) {
    console.log(err);
  }
};
