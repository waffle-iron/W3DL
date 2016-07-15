#!/usr/bin/node

// Required node modules
var exec = require("child_process").exec;
var fs = require("fs");
var os = require("os");
var rimraf = require("rimraf");

// Variables
var args = process.argv.slice(2);
var delim = (os.type() === "Windows_NT" ? "\\" : "/");

var buildTypes = [];
var allSelected = false;
var clean = false;
var defines = "";

var availableBuildTypes = {
  array: ["w3dl", "jsdoc"],
  w3dl:  function() { return this.array[0]; },
  jsdoc: function() { return this.array[1]; }
};

// Parse arguments
args.forEach(function(arg) {
  var a = arg.toLowerCase();
  if (a === "all") {
    buildTypes = [];
    buildTypes = buildTypes.concat(availableBuildTypes.array);
    allSelected = true;
  } else if (a === "clean") {
    clean = true;
  } else if (a === "debug") {
    defines += "-d DEBUG=true ";
  } else {
    if (!allSelected) {
      buildTypes.push(a);
    }
  }
});

if (buildTypes.length < 1) {
  buildTypes.push(availableBuildTypes.w3dl());
}

var buildCallback = function(buildType, isClean) {
  return function(err) {
    if (err) {
      console.error("Failed to " + (isClean ? "clean " : "build ") + buildType + " due to error: " + err);
    } else {
      console.log("Completed " + (isClean ? "clean." : "build."));
    }
  };
};

buildTypes.forEach(function(buildType) {
  var currentBuild = buildType.toUpperCase();
  console.log((clean ? "Cleaning " : "Building ") + currentBuild + "...");
  if (buildType === availableBuildTypes.w3dl()) {
    if (clean) {
      rimraf("bin", buildCallback(currentBuild, clean));
    } else {
      fs.stat("bin", function(err) {
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
          buildCallback(currentBuild, clean));
      });
    }
  } else if (buildType === availableBuildTypes.jsdoc()) {
    if (clean) {
      rimraf("W3DDOC", buildCallback(currentBuild, clean));
    } else {
      exec("node_modules" + delim + ".bin" + delim + "jsdoc -r -d W3DDOC -R JSDOC_README.md src", buildCallback(currentBuild, clean));
    }
  } else {
    console.error("Invalid build type: " + buildType + ".");
    return;
  }
});
