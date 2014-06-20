var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser')

var controllers = require("./controllers");
// setup the view engine
//app.set("view engine", "jade");
//var ejsEngine = require("ejs-locals");
//app.engine("ejs", ejsEngine);
//app.set("view engine", "ejs");
app.set("view engine", "vash");

// opt into services
app.use(bodyParser.urlencoded());

 
//set the public static resources folder
app.use(express.static(__dirname + "/public"));

// map the routes
controllers.init(app); 

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json"); 
    res.send({ nome: "raphael", isAdmin: true, data: new Date("10/01/2013") });
});

app.get("/api/sql", function (req, res) {
    var msnodesql = require('node-sqlserver-unofficial');
    var connstring = "Driver={SQL Server Native Client 11.0};Server=.\\sqlexpress;Database=Changer;Trusted_Connection={Yes};";
     msnodesql.query(connstring, "Select * from Pais", function (err, results) {
        console.log(err);
        res.send(results);
    });
});
server.listen(3000);