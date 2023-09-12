require("dotenv").config()
var express = require('express');
var app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoDB = process.env.CNN; 

//Polling Daemon
const resourceController = require("./src/presentation/controllers/ResourceController");
async function daemonFunc() {
  await resourceController.pollingUpdateNewses();
  console.log('Process daemon done!');
}
setInterval(daemonFunc, 432000);

app.listen(port, async () => {
    await mongoose.connect(mongoDB)
    console.log("This application is running at port", port)
});




