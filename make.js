var exec = require("child_process").exec;
var fs = require("fs");
var os = require("os");
var rimraf = require("rimraf");

var delim = "/";
var build = false;
var defines = "";

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
  rimraf("bin", output);
} else if (process.argv[2] === "jsdoc") {
  exec("node_modules" + delim + ".bin" + delim + "jsdoc -r -d W3DDOC -R JSDOC_README.md src", output);
} else if (process.argv[2] === "debug") {
  build = true;
  defines += "-d DEBUG=true ";
} else {
  build = true;
}

if (build) {
  fs.access("bin", fs.F_OK, function(err) {
    if (err) {
      fs.mkdirSync("bin");
    }
    exec("node_modules" + delim + ".bin" + delim + "uglifyjs " +
      "-o bin" + delim + "w3dl.min.js " +
      //"--source-map bin" + delim + "w3dl.min.js.map " +
      "--compress " +
      "--mangle " +
      defines +
      "-- " +
      "src" + delim + "W3DL.js " + // MUST BE FIRST
      "shaders" + delim + "color-fragment.js " +
      "shaders" + delim + "color-vertex.js " +
      "shaders" + delim + "gouraud-fragment.js " +
      "shaders" + delim + "gouraud-vertex.js " +
      "shaders" + delim + "phong-fragment.js " +
      "shaders" + delim + "phong-vertex.js " +
      "shaders" + delim + "texture-fragment.js " +
      "shaders" + delim + "texture-vertex.js " +
      "shaders" + delim + "white-vertex.js " +
      "src" + delim + "Utils.js " +
      "src" + delim + "Math.js " +
      "src" + delim + "Color.js " +
      "src" + delim + "Vector.js " +
      "src" + delim + "Matrix.js " +
      "src" + delim + "Vertex.js " +
      "src" + delim + "IndexedVertexArray.js " +
      "src" + delim + "ShaderProgram.js " +
      "src" + delim + "Texture2D.js " +
      "src" + delim + "Material.js " +
      "src" + delim + "Object3D.js " +
      "src" + delim + "GraphicsObject3D.js " +
      "src" + delim + "W3DLModule.js ", // MUST BE LAST
      output);
  });
}
