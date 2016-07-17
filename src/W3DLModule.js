// jshint esversion: 6

/**
 * This file exports the W3DL namespace object as a node module. This file is
 * assumed to be the final file in the W3DL API that is loaded or minified.
 * @file
 * @requires {@link W3DL.js}
 */

if (NODE_MODULE) {
  module.exports = W3DL;
}
