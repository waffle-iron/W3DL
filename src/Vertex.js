// jshint esversion: 6

class Vertex {
  constructor(position, color = new ColorRGBA(), texture = new Vector2D(), normal = new Vector4D()) {
    ValidateArguments([Vector, ColorRGBA, Vector2D, Vector4D], arguments, 1);
    this.position = position;
    this.color = color;
    this.texture = texture;
    this.normal = normal;
  }

  get toArray() {
    return this.position.toArray.concat(this.color.toArray).concat(this.texture.toArray).concat(this.normal.toArray);
  }

  get toFloat32Array() {
    return new Float32Array(this.toArray);
  }
}
