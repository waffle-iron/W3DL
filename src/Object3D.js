// jshint esversion: 6

/**
 * @todo Documentation.
 * @file
 * @requires {@link Matrix.js}
 * @see Object3D
 */

/**
 * @todo Documentation.
 * @class
 */
class Object3D {
  constructor(initialPosition = new Vector3D(), initialScale = new Vector3D(1, 1, 1), initialRotation = new Vector3D()) {
    W3DUtils.ValidateArguments([Vector3D, Vector3D, Vector3D], arguments, 0);
    this.position = initialPosition;
    this.scale = initialScale;
    this.rotation = initialRotation;
    this.transformation = Matrix4.IdentityMatrix();
    this.children = [];
  }

  update(deltaTime) {
    W3DUtils.ValidateArguments([Number], arguments);
    this.children.forEach(function(child) {
      child.update(deltaTime);
    });
  }

  draw(parentTransformation = MyMatrix4.IdentityMatrix()) {
    W3DUtils.ValidateArguments([Matrix4], arguments, 0);
    // Scale is not passed onto children
    transformation = parentTransformation.multiply(Matrix4.TranslationMatrix(this.position)).
      multiply(Matrix4.RollPitchYawRotationMatrix(this.rotation.z, this.rotation.x, this.rotation.y));

      this.children.forEach(function(child) {
        child.draw(transformation);
      });

    transformation = transformation.multiply(Matrix4.ScaleMatrix(this.scale.x, this.scale.y, this.scale.z));
  }

  rotate(x, y, z, isDegree = true) {
    W3DUtils.ValidateArguments([Number, Number, Number, Boolean], arguments, 3);
    this.rotation.x += (!isDegree ? W3DMath.RadianToDegree(x) : x);
    this.rotation.y += (!isDegree ? W3DMath.RadianToDegree(y) : y);
    this.rotation.z += (!isDegree ? W3DMath.RadianToDegree(z) : z);
  }

  scale(x, y, z, recursive = false) {
    W3DUtils.ValidateArguments([Number, Number, Number, Boolean], arguments, 3);
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
    W3DUtils.ValidateArguments([Number, Number, Number], arguments);
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  pitch(angle, isDegree = true) {
    W3DUtils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.x += (!isDegree ? W3DMath.RadianToDegree(angle) : angle);
  }

  yaw(angle, isDegree = true) {
    W3DUtils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.y += (!isDegree ? W3DMath.RadianToDegree(angle) : angle);
  }

  roll(angle, isDegree = true) {
    W3DUtils.ValidateArguments([Number, Boolean], arguments, 1);
    this.rotation.z += (!isDegree ? W3DMath.RadianToDegree(angle) : angle);
  }

  addChild(child) {
    W3DUtils.ValidateArguments([Object3D], arguments);
    this.children.push(child);
  }

  removeChild(child) {
    W3DUtils.ValidateArguments([Object3D], arguments);
    var index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
}
