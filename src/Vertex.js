// jshint esversion: 6

/**
 * This file defines a class to represent a vertex, a wrapper for various data
 * corresponding to a point in space, presumably making up the surface of an
 * object mesh.
 * @file
 * @requires {@link Color.js}
 * @requires {@link Vector.js}
 * @see W3DL.Vertex
 */

/**
 * A class to represent a vertex in space. Vertices hold information about their
 * location, their color, their texture coordinate mapping, and their normal in
 * 3D space.
 * @class
 */
W3DL.Vertex = class Vertex {
  /**
   * @param {W3DL.Vector} position A vector representing the spacial position of the
            vertex.
   * @param {W3DL.ColorRGBA} [color=new W3DL.ColorRGBA()] A color attribute for
            the vertex.
   * @param {W3DL.Vector2D} [texture=new W3DL.Vector2D()] A vector mapping to
            coordinates on a 2D texture.
   * @param {W3DL.Vector4D} [normal=new W3DL.Vector4D()] A vector representing the normal
            to the surface upon which the vertex is found.
   */
  constructor(position, color = new W3DL.ColorRGBA(), texture = new W3DL.Vector2D(), normal = new W3DL.Vector4D()) {
    W3DL.Utils.ValidateArguments([W3DL.Vector, W3DL.ColorRGBA, W3DL.Vector2D, W3DL.Vector4D], arguments, 1);

    /**
     * A vector representing the spacial position of the vertex.
     * @type {W3DL.Vector}
     */
    this.position = position;

    /**
     * A color attribute for the vertex.
     * @type {W3DL.ColorRGBA}
     */
    this.color = color;

    /**
     * A vector mapping to coordinates on a 2D texture.
     * @type {W3DL.Vector2D}
     */
    this.texture = texture;

    /**
     * A vector representing the normal to the surface upon which the vertex is
     * found.
     * @type {W3DL.Vector4D}
     */
    this.normal = normal;
  }

  /**
   * Returns the vertex object converted into an array with values for position,
   * color, texture coordinates, and normal, all converted into arrays and
   * concatenated together.
   * @type {Number[]}
   */
  get toArray() {
    return this.position.toArray.concat(this.color.toArray).concat(this.texture.toArray).concat(this.normal.toArray);
  }

  /**
   * Returns W3DL.Vertex.toArray converted into a Float32Array.
   * @type {Float32Array}
   */
  get toFloat32Array() {
    return new Float32Array(this.toArray);
  }
};
