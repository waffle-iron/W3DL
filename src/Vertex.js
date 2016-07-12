// jshint esversion: 6

/**
 * A class to represent a vertex in space. Vertices hold information about their
 * location, their color, their texture coordinate mapping, and their normal in
 * 3D space.
 * @class
 */
class Vertex {
  /**
   * @param {Vector} position A vector representing the spacial position of the
            vertex.
   * @param {ColorRGBA} [color=new ColorRGBA()] A color attribute for the
            vertex.
   * @param {Vector2D} [texture=new Vector2D()] A vector mapping to
            coordinates on a 2D texture.
   * @param {Vector4D} [normal=new Vector4D()] A vector representing the normal
            to the surface upon which the vertex is found.
   */
  constructor(position, color = new ColorRGBA(), texture = new Vector2D(), normal = new Vector4D()) {
    ValidateArguments([Vector, ColorRGBA, Vector2D, Vector4D], arguments, 1);

    /**
     * A vector representing the spacial position of the vertex.
     * @type {Vector}
     */
    this.position = position;

    /**
     * A color attribute for the vertex.
     * @type {ColorRGBA}
     */
    this.color = color;

    /**
     * A vector mapping to coordinates on a 2D texture.
     * @type {Vector2D}
     */
    this.texture = texture;

    /**
     * A vector representing the normal to the surface upon which the vertex is
     * found.
     * @type {Vector4D}
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
   * Returns Vertex.toArray converted into a Float32Array.
   * @type {Float32Array}
   */
  get toFloat32Array() {
    return new Float32Array(this.toArray);
  }
}
