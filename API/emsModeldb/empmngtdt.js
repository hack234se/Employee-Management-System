const mongoose=require("mongoose");

const emsempDB = mongoose.Schema({
    FirstName: {type: String,},
    LastName: {type: String,},
    Age: {type: Number,},
    DateOfJoining: {type: Date,},
    Title: {type: String,},
    Department: {type: String,},
    EmployeeType: {type: String,},
    CurrentStatus: {type: Boolean,},
  });
  
  const EmployeeDB = mongoose.model("emsempDB", emsempDB);
  module.exports = EmployeeDB;
  