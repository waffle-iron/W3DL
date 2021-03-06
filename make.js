#!/usr/bin/node

// Required node modules
var fs = require("fs");
var jsdoc = require("jsdoc-api");
var os = require("os");
var path = require("path");
var rimraf = require("rimraf").sync;
var uglifyjs = require("uglify-js-harmony");

// Variables
var args = process.argv.slice(2);
var delim = (os.type() === "Windows_NT" ? "\\" : "/");

var projRootDir = process.cwd();
var projBinDir = path.join(projRootDir, "bin");
var projDocDir = path.join(projRootDir, "W3DDOC");
var projShaderDir = path.join(projRootDir, "shaders");
var projSrcDir = path.join(projRootDir, "src");
var projTmpDir = path.join(projRootDir, ".tmp");
var outFileMin = "w3dl.min.js";
var outFileMap = "w3dl.min.js.map";

var buildTypes = [];
var allSelected = false;
var clean = false;
var defineStrings = {
  debug: "const DEBUG = false\n",
  nodeModule: "const NODE_MODULE = false\n",
  toString: function() {
    return this.debug + this.nodeModule;
  }
};

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
    defineStrings.debug = "const DEBUG = true\n";
  } else if (a === "module") {
    defineStrings.nodeModule = "const NODE_MODULE = true\n";
  } else {
    if (availableBuildTypes.array.indexOf(a) === -1) {
      console.error("Invalid argument: " + a + ".");
    } else if (!allSelected) {
      if (buildTypes.indexOf(a) === -1) {
        buildTypes.push(a);
      }
    }
  }
});

if (buildTypes.length < 1) {
  buildTypes.push(availableBuildTypes.w3dl());
}

rimraf(projTmpDir);

buildTypes.forEach(function(buildType) {
  var currentBuild = buildType.toUpperCase();
  console.log((clean ? "Cleaning " : "Building ") + currentBuild + "...");
  fs.mkdirSync(projTmpDir);
  if (buildType === availableBuildTypes.w3dl()) {
    if (clean) {
      try {
        rimraf(projBinDir);
      } catch (err) {
        console.error("Failed to remove bin directory. " + err);
      }
    } else {
      try {
        fs.statSync(projBinDir);
      } catch (err) {
        fs.mkdirSync("bin");
      }
      try {
        fs.writeFileSync(path.join(projTmpDir, "Defines.js"), defineStrings.toString());
      } catch (err) {
        console.error("Failed to write to temporary Defines file. " + err);
      }
      var uglifyResult = uglifyjs.minify(
        [
          path.join(projSrcDir, "W3DL.js"), // MUST BE FIRST
          path.join(projTmpDir, "Defines.js"),
          path.join(projShaderDir, "color-fragment.js"),
          path.join(projShaderDir, "color-vertex.js"),
          path.join(projShaderDir, "gouraud-fragment.js"),
          path.join(projShaderDir, "gouraud-vertex.js"),
          path.join(projShaderDir, "phong-fragment.js"),
          path.join(projShaderDir, "phong-vertex.js"),
          path.join(projShaderDir, "texture-fragment.js"),
          path.join(projShaderDir, "texture-vertex.js"),
          path.join(projShaderDir, "white-vertex.js"),
          path.join(projSrcDir, "Utils.js"),
          path.join(projSrcDir, "Math.js"),
          path.join(projSrcDir, "Color.js"),
          path.join(projSrcDir, "Vector.js"),
          path.join(projSrcDir, "Matrix.js"),
          path.join(projSrcDir, "Vertex.js"),
          path.join(projSrcDir, "IndexedVertexArray.js"),
          path.join(projSrcDir, "ShaderProgram.js"),
          path.join(projSrcDir, "Texture2D.js"),
          path.join(projSrcDir, "Material.js"),
          path.join(projSrcDir, "Object3D.js"),
          path.join(projSrcDir, "GraphicsObject3D.js"),
          path.join(projSrcDir, "W3DLModule.js") // MUST BE LAST
        ],
        {
          outSourceMap: "w3dl.min.js.map",
          sourceRoot: "file:///",
          compress: {
            dead_code: true,
            unused: true
          },
          mangle: true,
          warnings: true
        }
      );
      try {
        fs.writeFileSync(path.join(projBinDir, outFileMin), uglifyResult.code);
      } catch (err) {
        console.error("Failed to save " + outFileMin + ". " + err);
      }
      try {
        fs.writeFileSync(path.join(projBinDir, outFileMap), uglifyResult.map);
      } catch (err) {
        console.error("Failed to save " + outFileMap + ". " + err);
      }
    }
  } else if (buildType === availableBuildTypes.jsdoc()) {
    if (clean) {
      try {
        rimraf(projDocDir);
      } catch (err) {
        console.error("Failed to remove jsdoc directory. " + err);
      }
    } else {
      try {
        jsdoc.renderSync(
          {
            destination: projDocDir,
            files: projSrcDir,
            recurse: true,
            readme: path.join(projRootDir, "JSDOC_README.md")
          }
        );
      } catch (err) {
        console.error("Failed to build jsdocs. " + err);
      }
    }
  } else {
    console.error("Invalid build target attempt: " + buildType + ".");
    return;
  }
  try {
    rimraf(projTmpDir);
  } catch (err) {
    console.error("Failed to remove temporary build directory. " + err);
  }
});
