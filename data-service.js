//arrays declaration
var employees = [];
var departments = [];
const fs = require("fs");

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    //check if file is available or not so that it is written in try lock in cause if file is not available it catcj exception and show error messag
    try {
      fs.readFile("./data/employees.json", (errors, items) => {
        if (errors) throw errors;
        employees = JSON.parse(items);
      });
      fs.readFile("./data/departments.json", (errors, items) => {
        if (errors) throw errors;
        departments = JSON.parse(items);
      });
    } catch (ex) {
      reject("Unable to read file!");
    }

    resolve("successfull");
  });
};
//fetch data from deoartment json file
module.exports.getDepartments = function () {
  // return promis if records available it returns all department details else it retun an result not found message
  return new Promise(function (resolve, reject) {
    if (departments.length == 0) {
      reject("Not Found!");
    } else {
      resolve(departments);
    }
  });
  //get data from employee json file
  module.exports.getAllEmployees = function () {
    var Allemployees = [];
    return new Promise((resolve, reject) => {
      var i = 0;
      while (i < employees.length) {
        Allemployees.push(employees[i]);
        i++;
      }
      // return promis if records available it returns all employee details else it retun an result not found message
      if (Allemployees.length == 0) reject("Not Found");
      resolve(Allemployees);
    });
  };
  //fetch Managers data from managers json file
  module.exports.getManagers = function () {
    var managersArray = [];
    return new Promise(function (resolve, reject) {
      var i = 0;
      while (i < employees.length) {
        if (employees[i].isManager == true) {
          managersArray.push(employees[i]);
        }
        i++;
      }
      // return promis if records available it returns all manager details else it retun an result not found message
      if (managersArray.length == 0) reject("Not Found");
      resolve(managersArray);
    });
  };
};
