// jshint esversion: 6

/**
 * This file defines classes for vectors used for spacial coordinates and
 * calculations, among other things.
 * @file
 * @requires {@link Utils.js}
 * @see W3DL.Vector
 * @see W3DL.Vector2D
 * @see W3DL.Vector3D
 * @see W3DL.Vector4D
 */

/**
 * @todo Documentation.
 * @class
 * @abstract
 */
W3DL.Vector = class Vector {
  constructor() {
    if (new.target === W3DL.Vector) {
      throw new TypeError("Cannot construct instances of abstract class: " + new.target.name);
    }
    if (this.length === undefined || typeof this.length !== "number") {
      throw new TypeError("Override required for method: length");
    }
    if (this.dot === undefined || typeof this.dot !== "function") {
      throw new TypeError("Override required for method: dot");
    }
    if (this.negative === undefined || typeof this.negative !== "function") {
      throw new TypeError("Override required for method: negative");
    }
    if (this.add === undefined || typeof this.add !== "function") {
      throw new TypeError("Override required for method: add");
    }
    if (this.subtract === undefined || typeof this.subtract !== "function") {
      throw new TypeError("Override required for method: subtract");
    }
    if (this.multiply === undefined || typeof this.multiply !== "function") {
      throw new TypeError("Override required for method: multiply");
    }
    if (this.divide === undefined || typeof this.divide !== "function") {
      throw new TypeError("Override required for method: divide");
    }
    if (this.toArray === undefined || typeof this.toArray !== "object") {
      throw new TypeError("Override required for method: toArray");
    }
  }

  get normalized() {
    var len = this.length;
    return (len === 0 ? 0 : this.divide(len));
  }

  get toFloat32Array() {
    return new Float32Array(this.toArray);
  }
};

/**
 * @todo Documentation.
 * @class
 * @extends W3DL.Vector
 */
W3DL.Vector2D = class Vector2D extends W3DL.Vector {
  constructor(x = 0.0, y = 0.0) {
    DEBUG && W3DL.Utils.ValidateArguments([Number, Number], arguments, 0); // jshint ignore:line
    super();
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return (this.x * other.x + this.y * other.y);
  }

  negative() {
    return new W3DL.Vector2D(-this.x, -this.y);
  }

  add(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector2D(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector2D(this.x - other.x, this.y - other.y);
  }

  multiply(multiplier) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector2D(this.x * multiplier, this.y * multiplier);
  }

  divide(divisor) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector2D(this.x / divisor, this.y / divisor);
  }

  get toArray() {
    return [this.x, this.y];
  }
};

/**
 * @todo Documentation.
 * @class
 * @extends W3DL.Vector
 */
W3DL.Vector3D = class Vector3D extends W3DL.Vector {
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    DEBUG && W3DL.Utils.ValidateArguments([Number, Number, Number], arguments, 0); // jshint ignore:line
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dot(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return (this.x * other.x + this.y * other.y + this.z * other.z);
  }

  cross(other) {
    DEBUG && W3DL.Utils.ValidateArguments([[W3DL.Vector3D, W3DL.Vector4D]], arguments); // jshint ignore:line
    return new W3DL.Vector3D((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
  }

  negative() {
    return new W3DL.Vector3D(-this.x, -this.y, -this.z);
  }

  add(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  subtract(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  multiply(multiplier) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector3D(this.x * multiplier, this.y * multiplier, this.z * multiplier);
  }

  divide(divisor) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector3D(this.x / divisor, this.y / divisor, this.z / divisor);
  }

  get toArray() {
    return [this.x, this.y, this.z];
  }
};

/**
 * @todo Documentation.
 * @class
 * @extends W3DL.Vector
 */
W3DL.Vector4D = class Vector4D extends W3DL.Vector {
  constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    DEBUG && W3DL.Utils.ValidateArguments([Number, Number, Number, Number], arguments, 0); // jshint ignore:line
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  dot(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return (this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w);
  }

  dot3(other) {
    DEBUG && W3DL.Utils.ValidateArguments([[W3DL.Vector3D, W3DL.Vector4D]], arguments); // jshint ignore:line
    return (this.x * other.x + this.y * other.y + this.z * other.z);
  }

  cross(other) {
    DEBUG && W3DL.Utils.ValidateArguments([[W3DL.Vector3D, W3DL.Vector4D]], arguments); // jshint ignore:line
    return new W3DL.Vector4D((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
  }

  negative() {
    return new W3DL.Vector4D(-this.x, -this.y, -this.z, -this.w);
  }

  add(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector4D(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }

  subtract(other) {
    DEBUG && W3DL.Utils.ValidateArguments([this.constructor], arguments); // jshint ignore:line
    return new W3DL.Vector4D(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
  }

  multiply(multiplier) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector4D(this.x * multiplier, this.y * multiplier, this.z * multiplier, this.w * multiplier);
  }

  divide(divisor) {
    DEBUG && W3DL.Utils.ValidateArguments([Number], arguments); // jshint ignore:line
    return new W3DL.Vector4D(this.x / divisor, this.y / divisor, this.z / divisor, this.w / divisor);
  }

  get toArray() {
    return [this.x, this.y, this.z, this.w];
  }
};
