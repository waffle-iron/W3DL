// jshint esversion: 6

class Matrix {
  constructor() {
    if (new.target === Matrix) {
      throw new TypeError("Cannot construct instances of abstract class: " + new.target);
    }
    if (this.matrixMultiply === undefined || typeof this.matrixMultiply !== "function") {
      throw new TypeError("Override required for method: matrixMultiply");
    }
    if (this.vectorMultiply === undefined || typeof this.vectorMultiply !== "function") {
      throw new TypeError("Override required for method: vectorMultiply");
    }
    this.entries = null;
  }

  static NullMatrix() {
    return new this();
  }

  static ZeroMatrix() {
    var matrix = new this();
    var m = matrix.entries.length;
    var n = matrix.entries[m - 1].length;
    matrix.entries[m - 1][n - 1] = 1;
    return matrix;
  }

  static IdentityMatrix() {
    var matrix = new this();
    for (var i = 0; i < matrix.entries.length; i++) {
      if (matrix.entries[i] === undefined || matrix.entries[i][i] === undefined) {
        break;
      }
      matrix.entries[i][i] = 1;
    }
    return matrix;
  }

  nullify() {
    for (var i = 0; i < this.entries.length; i++) {
      for (var j = 0; j < this.entries[i].length; j++) {
        this.entries[i][j] = 0;
      }
    }
  }

  transposed() {
    var matrix = new this.constructor();
    for (var i = 0; i < this.entries.length; i++) {
      for (var j = 0; j < this.entries[i].length; j++) {
        if (matrix.entries[j][i] !== undefined) {
          matrix.entries[j][i] = this.entries[i][j];
        }
      }
    }
    return matrix;
  }

  add(other) {
    ValidateArguments([this.constructor], arguments);
    var matrix = new this.constructor();
    for (var i = 0; i < matrix.entries.length; i++) {
      for (var j = 0; j < matrix.entries[i].length; j++) {
        matrix.entries[i][j] = this.entries[i][j] + other.entries[i][j];
      }
    }
    return matrix;
  }

  subtract(other) {
    ValidateArguments([this.constructor], arguments);
    var matrix = new this.constructor();
    for (var i = 0; i < matrix.entries.length; i++) {
      for (var j = 0; j < matrix.entries[i].length; j++) {
        matrix.entries[i][j] = this.entries[i][j] - other.entries[i][j];
      }
    }
    return matrix;
  }

  multiply(multiplier) {
    ValidateArguments([[Number, Matrix, Vector]], arguments);
    var product = null;
    if (new multiplier.constructor() instanceof Number) {
      product = new this.constructor();
      for (var i = 0; i < this.entries.length; i++) {
        for (var j = 0; j < this.entries[i].length; j++) {
          product.entries[i][j] = this.entries[i][j] * multiplier;
        }
      }
    } else if (multiplier instanceof Matrix) {
      product = this.matrixMultiply(multiplier);
    } else if (multiplier instanceof Vector) {
      product = this.vectorMultiply(multiplier);
    }
    return product;
  }

  toString() {
    var str = "";
    this.entries.forEach(function(entry, index, array) {
      str = str + entry.toString();
      if (index < array.length - 1) {
        str = str + "\n";
      }
    });
    return str;
  }
}

class Matrix4 extends Matrix {
  constructor(vector1 = new Vector4D(0, 0, 0, 0), vector2 = new Vector4D(0, 0, 0, 0), vector3 = new Vector4D(0, 0, 0, 0), vector4 = new Vector4D(0, 0, 0, 0)) {
    ValidateArguments([Vector4D, Vector4D, Vector4D, Vector4D], arguments, 0);
    super();
    this.entries = [vector1.toArray, vector2.toArray, vector3.toArray, vector4.toArray];
  }

  /*
  Creates a matrix like this:
         1       0       0       0
         0  cos(a) -sin(a)       0
         0  sin(a)  cos(a)       0
         0       0       0       1
  where a = angle.
  */
  static RotationAboutXMatrix(angle, isDegree = true) {
    ValidateArguments([Number, Boolean], arguments, 1);
    var a = (isDegree ? DegreeToRadian(angle) : angle);

    var matrix = Matrix4.IdentityMatrix();
    matrix.entries[1][1] = matrix.entries[2][2] = Math.cos(a);
    matrix.entries[1][2] = -(matrix.entries[2][1] = Math.sin(a));

    return matrix;
  }

  /*
  Creates a matrix like this:
    cos(a)       0  sin(a)       0
         0       1       0       0
   -sin(a)       0  cos(a)       0
         0       0       0       1
  where a = angle.
  */
  static RotationAboutYMatrix(angle, isDegree = true) {
    ValidateArguments([Number, Boolean], arguments, 1);
    var a = (isDegree ? DegreeToRadian(angle) : angle);

    var matrix = Matrix4.IdentityMatrix();
    matrix.entries[0][0] = matrix.entries[2][2] = Math.cos(a);
    matrix.entries[0][2] = -(matrix.entries[2][0] = -Math.sin(a));

    return matrix;
  }

  /*
  Creates a matrix like this:
    cos(a) -sin(a)       0       0
    sin(a)  cos(a)       0       0
         0       0       1       0
         0       0       0       1
  where a = angle.
  */
  static RotationAboutZMatrix(angle, isDegree = true) {
    ValidateArguments([Number, Boolean], arguments, 1);
    var a = (isDegree ? DegreeToRadian(angle) : angle);

    var matrix = Matrix4.IdentityMatrix();
    matrix.entries[0][0] = matrix.entries[1][1] = Math.cos(a);
    matrix.entries[0][1] = -(matrix.entries[1][0] = Math.sin(a));

    return matrix;
  }

  static RollPitchYawRotationMatrix(roll, pitch, yaw, isDegree = true) {
    ValidateArguments([Number, Number, Number, Boolean], arguments, 3);
    return (RotationAboutYMatrix(yaw, isDegree) * RotationAboutXMatrix(pitch, isDegree) * RotationAboutZMatrix(roll, isDegree));
  }

  static RotationAboutVectorAxisMatrix(vector, angle, isDegree = true) {
    ValidateArguments([[Vector3D, Vector4D], Number, Boolean], arguments, 2);
    var a = (isDegree ? DegreeToRadian(angle) : angle);
    var v = vector.normalized();

    var x = v.x;
    var y = v.y;
    var z = v.z;
    var c = cos(a);
    var s = sin(a);

    return new Matrix4(new Vector4D(c + (x * x * (1 - c)), (x * y * (1 - c)) - (z * s), (x * z * (1 - c)) + (y * s), 0),
      new Vector4D((x * y * (1 - c)) + (z * s), c + (y * y * (1 - c)), (y * z * (1 - c)) - (x * s), 0),
      new Vector4D((z * x * (1 - c)) - (y * s), (z * y * (1 - c)) + (x * s), c + (z * z * (1 - c)), 0),
      new Vector4D());
  }

  static ScaleMatrix(x, y, z) {
    ValidateArguments([Number, Number, Number], arguments);
    return new Matrix4(new Vector4D(x, 0, 0, 0), new Vector4D(0, y, 0, 0), new Vector4D(0, 0, z, 0), new Vector4D());
  }

  static TranslationMatrix(x, y, z) {
    ValidateArguments([Number, Number, Number], arguments);
    return new Matrix4(new Vector4D(1, 0, 0, x), new Vector4D(0, 1, 0, y), new Vector4D(0, 0, 1, z), new Vector4D());
  }

  static TranslationFromVectorMatrix(vector) {
    ValidateArguments([[Vector3D, Vector4D]], arguments);
    return TranslationMatrix(vector.x, vector.y, vector.z);
  }

  static CameraMatrix(position, lookAt, upVector) {
    ValidateArguments([[Vector3D, Vector4D], [Vector3D, Vector4D], [Vector3D, Vector4D]], arguments);
    var pos = (position instanceof Vector3D ? position : new Vector3D(position.x, position.y, position.z));
    var look = (lookAt instanceof Vector3D ? lookAt : new Vector3D(lookAt.x, lookAt.y, lookAt.z));
    var up = (upVector instanceof Vector3D ? upVector : new Vector3D(upVector.x, upVector.y, upVector.z));

    var n = pos.subtract(look).normalized;
    var u = up.cross(n).normalized;
    var v = n.cross(u);

    var matrix = new Matrix4(new Vector4D(u.x, u.y, u.z), new Vector4D(v.x, v.y, v.z), new Vector4D(n.x, n.y, n.z), new Vector4D());
    matrix.entries[0][3] = u.negative().dot(pos);
    matrix.entries[1][3] = v.negative().dot(pos);
    matrix.entries[2][3] = n.negative().dot(pos);
    return matrix;
  }

  static FrustrumProjetionMatrix(xMin, yMin, xMax, yMax, nearPlane, farPlane) {
    ValidateArguments([Number, Number, Number, Number, Number, Number], arguments);
    throw new Error("Unimplemented");
  }

  static SymmetricPerspectiveProjectionMatrix(fieldOfView, aspectRatio, nearPlane, farPlane) {
    ValidateArguments([Number, Number, Number, Number], arguments);
    var matrix = Matrix4.IdentityMatrix();
    var cot = 1 / Math.tan(DegreeToRadian(fieldOfView / 2));
    matrix.entries[0][0] = cot / aspectRatio;
    matrix.entries[1][1] = cot;
    matrix.entries[2][2] = (nearPlane + farPlane) / (nearPlane - farPlane);
    matrix.entries[2][3] = 2 * nearPlane * farPlane / (nearPlane - farPlane);
    matrix.entries[3][2] = -1;
    matrix.entries[3][3] = 0;
    return matrix;
  }

  matrixMultiply(other) {
    ValidateArguments([Matrix4], arguments);
    var matrix = new Matrix4();
    var otherMatrix = other.transposed();
    for (var i = 0; i < 4; i++) {
      var vector1 = new Vector4D(this.entries[i][0], this.entries[i][1], this.entries[i][2], this.entries[i][3]);
      for (var j = 0; j < 4; j++) {
        var vector2 = new Vector4D(otherMatrix.entries[j][0], otherMatrix.entries[j][1], otherMatrix.entries[j][2], otherMatrix.entries[j][3]);
        matrix.entries[i][j] = vector1.dot(vector2);
      }
    }
    return matrix;
  }

  vectorMultiply(vector) {
    ValidateArguments([Vector4D], arguments);
    var rows = [
      new Vector4D(this.entries[0][0], this.entries[0][1], this.entries[0][2], this.entries[0][3]),
      new Vector4D(this.entries[1][0], this.entries[1][1], this.entries[1][2], this.entries[1][3]),
      new Vector4D(this.entries[2][0], this.entries[2][1], this.entries[2][2], this.entries[2][3]),
      new Vector4D(this.entries[3][0], this.entries[3][1], this.entries[3][2], this.entries[3][3]),
    ];
    return new Vector4D(rows[0].dot(vector), rows[1].dot(vector), rows[2].dot(vector), rows[3].dot(vector));
  }
}
