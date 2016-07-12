var exec = require("child_process").exec;
var rimraf = require("rimraf");

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
  exec("jsdoc -r -d W3DDOC -R README.md src", output);
}
