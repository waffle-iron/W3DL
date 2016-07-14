// jshint esversion: 6

/**
 * @todo Documentation.
 * @file
 * @requires {@link Matrix.js}
 * @see W3DL.Object3D
 */

/**
 * @todo Documentation.
 * @class
 */
W3DL.Object3D = class Object3D {
  constructor(initialPosition = new W3DL.Vector3D(), initialScale = new W3DL.Vector3D(1, 1, 1), initialRotation = new W3DL.Vector3D()) {
    W3DL.Utils.ValidateArguments([W3DL.Vector3D, W3DL.Vector3D, W3DL.Vector3D], arguments, 0);
    this.position = initialPosition;
    this.scale = initialScale;
    this.rotation = initialRotation;
    this.transformation = W3DL.Matrix4.IdentityMatrix();
    this.children = [];
  }

  update(deltaTime) {
    W3DL.Utils.ValidateArguments([Number], arguments);
    this.children.forEach(function(child) {
      child.update(deltaTime);
    });
  }

  draw(parentTransformation = W3DL.Matrix4.IdentityMatrix()) {
    W3DL.Utils.ValidateArguments([W3DL.Matrix4], arguments, 0);
    // Scale is not passed onto children
    this.transformation = parentTransformation.multiply(W3DL.Matrix4.TranslationMatrix(this.position.x, this.position.y, this.position.z)).
      multiply(W3DL.Matrix4.RollPitchYawRotationMatrix(this.rotation.z, this.rotation.x, this.rotation.y));

      this.children.forEach(function(child) {
        child.draw(this.transformation);
      });

    this.transformation = this.transformation.multiply(W3DL.Matrix4.ScaleMatrix(this.scale.x, this.scale.y, this.scale.z));
  }

  rotate(x, y, z, isDegree = true) {
    W3DL.Utils.ValidateArguments([Number, Number, Number, Boolean], arguments, 3);
    this.rotation.x += (!isDegree ? W3DL.Math.RadianToDegree(x) : x);
    this.rotation.y += (!isDegree ? W3DL.Math.RadianToDegree(y) : y);
    this.rotation.z += (!isDegree ? W3DL.Math.RadianToDegree(z) : z);
  }

  scale(x, y, z, recursive = false) {
    W3DL.Utils.ValidateArguments([Number, Number, Number, Boolean], arguments, 3);
    if (recursive) {
      this.children.forEach(function(child) {
        child.scale(x, y, z, recursive);
      });
    }
    this.scale.x *= x;
    this.scale.y *= y;
    this.scale.z *= z;
  }

  translate(x, y, z) {
    W3DL.Utils.ValidateArguments([Number, Number, Number], arguments);
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  pitch(angle, isDegree = true) {
    W3DL.Utils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.x += (!isDegree ? W3DL.Math.RadianToDegree(angle) : angle);
  }

  yaw(angle, isDegree = true) {
    W3DL.Utils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.y += (!isDegree ? W3DL.Math.RadianToDegree(angle) : angle);
  }

  roll(angle, isDegree = true) {
    W3DL.Utils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.z += (!isDegree ? W3DL.Math.RadianToDegree(angle) : angle);
  }

  addChild(child) {
    W3DL.Utils.ValidateArguments([W3DL.Object3D], arguments);
    this.children.push(child);
  }

  removeChild(child) {
    W3DL.Utils.ValidateArguments([W3DL.Object3D], arguments);
    var index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
};
