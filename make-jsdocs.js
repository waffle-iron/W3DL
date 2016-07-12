var exec = require("child_process").exec;
var os = require("os");
var rimraf = require("rimraf");

var delim = "/";

if (os.type() === "Windows_NT") {
  delim = "\\";
}

var output = function (error, stdout, stderr) {
  if (error) {
     console.log("error: " + error);
  }
  if (stdout) {
    console.log("stdout: " + stdout);
  }
  if (stderr) {
    console.log("stderr: " + stderr);
  }
};

if (process.argv[2] === "clean") {
  rimraf("W3DDOC", output);
} else {
  exec("node_modules" + delim + ".bin" + delim + "jsdoc -r -d W3DDOC -R README.md src", output);
}
