//Require the dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

//set up port to either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//Instantiate our Express app
var app = express();

//require our routes
var routes = require("./routes");

//designate our public folder as a static directory
app.use(express.static("public"));

//connect HB to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
//Have every request go through our route middleware
app.use(routes);

//If deployed, use the deployed database. Otherwise, use the local mongoHeadlines db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

//Listen to the port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});


