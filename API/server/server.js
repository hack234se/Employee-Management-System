const express = require("express");
const app = express();
const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const empmngtdb  = require("../database/employeemngtdb.js");
const EmployeeDB = require("../emsModeldb/empmngtdt.js");
const enableCors = (process.env.ENABLE_CORS || "true") == "true";

app.use(express.static("./public"));

const typdef_graphql = ``;

const employeeDetails = async (_, {emp_filter=null}) => {
  if(emp_filter == 'FullTime'){
    fetch_emp = EmployeeDB.find({'EmployeeType': 'FullTime'});
  }
  else if(emp_filter == 'PartTime'){
    fetch_emp = EmployeeDB.find({'EmployeeType': 'PartTime'});
  }
  else if(emp_filter == 'Seasonal'){
    fetch_emp = EmployeeDB.find({'EmployeeType': 'Seasonal'});
  }
  else if(emp_filter == 'Contract'){
    fetch_emp = EmployeeDB.find({'EmployeeType': 'Contract'});
  }
  else{
    fetch_emp = EmployeeDB.find()
  }
  return fetch_emp;
};

//to get single employee data
const getSingleemp = async (_, { id }) => {
  return EmployeeDB.findById(id);
};

//to add employee details to db
const addempdts = async (_, { employees }) => {
  const addemsempdt = new EmployeeDB(employees);
  await addemsempdt.save();
  return addemsempdt;
};

//to update employee details in db
const updateEmployee = async (_, { id, employee }) => {
  const newemsEmp = await EmployeeDB.findByIdAndUpdate(id, employee, {
    new: true,
  });
  return newemsEmp;
};

//to delete employee details from database
const employeeDelete = async (_, { id }) => {
  const empDelems = await EmployeeDB.findByIdAndDelete(id);
  return empDelems;
};

const resolvers = {
  Query: {
    employeeDetails: employeeDetails,
    getSingleemp: getSingleemp,
  },
  Mutation: {
    addempdts: addempdts,
    employeeDelete: employeeDelete,
    updateEmployee: updateEmployee,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/qlschema", "utf-8"),
  resolvers,
});

server.start().then((res) => {
  empmngtdb ();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4500, () => {
    console.log("http://localhost:4500" + server.graphqlPath);
  });
});
