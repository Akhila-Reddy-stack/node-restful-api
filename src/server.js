require("dotenv").config();
var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
var app = express();
var router = require("./routes");

const port = 5000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json({ limit: "50mb" }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(cors());

// import router
app.use(router);

// create http server
let server = http.createServer(app);

// starting the server
server = app.listen(port, function (err) {
  if (err) {
    console.log("Server creation error..");
  } else {
    console.log("Server is running on.." + port);
  }
});

