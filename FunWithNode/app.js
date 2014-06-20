console.log('Hello world');

var x = 10;
var y = 25;

console.log(x * y);

var msgs = require("./msgs");
var msg = new msgs();
console.log(msg.Message);


var logger = require("./logger");
logger.log("mensagem do logger");
