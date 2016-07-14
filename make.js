#!/usr/bin/node

// Required node modules
var exec = require("child_process").exec;
var fs = require("fs");
var os = require("os");
var rimraf = require("rimraf");

// Variables
var args = process.argv.slice(2);
var delim = (os.type() === "Windows_NT" ? "\\" : "/");

var build_types = [];
var all_selected = false;
var clean = false;
var defines = "";

var available_build_types = {
  array: ["w3dl", "jsdoc"],
  w3dl:  function() { return this.array[0]; },
  jsdoc: function() { return this.array[1]; }
};

// Parse arguments
args.forEach(function(arg) {
  var a = arg.toLowerCase();
  if (a === "all") {
    build_types = [];
    build_types = build_types.concat(available_build_types.array);
    all_selected = true;
  } else if (a === "clean") {
    clean = true;
  } else if (a === "debug") {
    defines += "-d DEBUG=true ";
  } else {
    if (!all_selected) {
      build_types.push(a);
    }
  }
});

if (build_types.length < 1) {
  build_types.push(available_build_types.w3dl());
}

var cleanCallback = function(err) {
  if (err) {
    console.error("Failed to clean due to error: " + err);
  }
};

var buildCallback = function(err) {
  if (err) {
    console.error("Failed to build due to error: " + err);
  }
};

build_types.forEach(function(build_type) {
  var current_build = build_type.toUpperCase();
  console.log((clean ? "Cleaning " : "Building ") + current_build + "...");
  if (build_type === available_build_types.w3dl()) {
    if (clean) {
      rimraf("bin", cleanCallback);
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
          buildCallback);
      });
    }
  } else if (build_type === available_build_types.jsdoc()) {
    if (clean) {
      rimraf("W3DDOC", cleanCallback);
    } else {
      exec("node_modules" + delim + ".bin" + delim + "jsdoc -r -d W3DDOC -R JSDOC_README.md src", buildCallback);
    }
  } else {
    console.error("Invalid build type: " + build_type + ".");
    return;
  }
  console.log("Complete.");
});
