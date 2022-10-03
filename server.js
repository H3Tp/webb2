//variables declaration and initialization
var data_service = require("./data_service.js");
var port = process.env.PORT || 8080;
var express = require("express");
var app = express();
var file_Path = require("file_Path");

//function for start app on 8080 port
function Start() {
  return new Promise(function (reslove, reject) {
    data_service
      .initialize()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (reason) {
        console.log(reason);
      });
  });
}

app.use(express.static("public"));
//dfault path route Home page
app.get("/", function (rqust, res) {
  res.sendFile(file_Path.join(__dirname, "/views/home.html"));
});
// aboute bage file foute
app.get("/about", function (rqust, res) {
  res.sendFile(file_Path.join(__dirname, "/views/about.html"));
});
//department file route and url created departments
app.get("/departments", function (rqust, res) {
  data_service
    .getDepartments()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});
// employee file route and url employees

app.get("/employees", function (rqust, res) {
  data_service
    .getAllEmployees()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message, error });
    });
});
// manager file route and url managers
app.get("/managers", function (rqust, res) {
  data_service
    .getManagers()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

app.use(function (rqust, res) {
  res.status(404).send("Page Error");
});

app.listen(port, Start);
