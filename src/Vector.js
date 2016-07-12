// jshint esversion: 6

/**
 * @class
 * @abstract
 */
class Vector {
  constructor() {
    if (new.target === Vector) {
      throw new TypeError("Cannot construct instances of abstract class: " + new.target);
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
}

/**
 * @class
 * @extends Vector
 */
class Vector2D extends Vector {
  constructor(x = 0.0, y = 0.0) {
    ValidateArguments([Number, Number], arguments, 0);
    super();
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(other) {
    ValidateArguments([this.constructor], arguments);
    return (this.x * other.x + this.y * other.y);
  }

  negative() {
    return new Vector2D(-this.x, -this.y);
  }

  add(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  multiply(multiplier) {
    ValidateArguments([Number], arguments);
    return new Vector2D(this.x * multiplier, this.y * multiplier);
  }

  divide(divisor) {
    ValidateArguments([Number], arguments);
    return new Vector2D(this.x / divisor, this.y / divisor);
  }

  get toArray() {
    return [this.x, this.y];
  }
}

/**
 * @class
 * @extends Vector
 */
class Vector3D extends Vector {
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    ValidateArguments([Number, Number, Number], arguments, 0);
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dot(other) {
    ValidateArguments([this.constructor], arguments);
    return (this.x * other.x + this.y * other.y + this.z * other.z);
  }

  cross(other) {
    ValidateArguments([[Vector3D, Vector4D]], arguments);
    return new Vector3D((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
  }

  negative() {
    return new Vector3D(-this.x, -this.y, -this.z);
  }

  add(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  subtract(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  multiply(multiplier) {
    ValidateArguments([Number], arguments);
    return new Vector3D(this.x * multiplier, this.y * multiplier, this.z * multiplier);
  }

  divide(divisor) {
    ValidateArguments([Number], arguments);
    return new Vector3D(this.x / divisor, this.y / divisor, this.z / divisor);
  }

  get toArray() {
    return [this.x, this.y, this.z];
  }
}

/**
 * @class
 * @extends Vector
 */
class Vector4D extends Vector {
  constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    ValidateArguments([Number, Number, Number, Number], arguments, 0);
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
    ValidateArguments([this.constructor], arguments);
    return (this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w);
  }

  dot3(other) {
    ValidateArguments([[Vector3D, Vector4D]], arguments);
    return (this.x * other.x + this.y * other.y + this.z * other.z);
  }

  cross(other) {
    ValidateArguments([[Vector3D, Vector4D]], arguments);
    return new Vector4D((this.y * other.z - this.z * other.y), -(this.x * other.z - this.z * other.x), (this.x * other.y - this.y * other.x));
  }

  negative() {
    return new Vector4D(-this.x, -this.y, -this.z, -this.w);
  }

  add(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector4D(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
  }

  subtract(other) {
    ValidateArguments([this.constructor], arguments);
    return new Vector4D(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
  }

  multiply(multiplier) {
    ValidateArguments([Number], arguments);
    return new Vector4D(this.x * multiplier, this.y * multiplier, this.z * multiplier, this.w * multiplier);
  }

  divide(divisor) {
    ValidateArguments([Number], arguments);
    return new Vector4D(this.x / divisor, this.y / divisor, this.z / divisor, this.w / divisor);
  }

  get toArray() {
    return [this.x, this.y, this.z, this.w];
  }
}
