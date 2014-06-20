
var file = require("./file");
module.exports.log = function (msg) {
    console.log(file.name + " " + msg);
};
