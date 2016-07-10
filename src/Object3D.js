// jshint esversion: 6

class Object3D {
  constructor(initialPosition = new Vector3D(), initialScale = new Vector3D(1, 1, 1), initialRotation = new Vector3D()) {
    ValidateArguments([Vector3D, Vector3D, Vector3D], arguments, 0);
    this.position = initialPosition;
    this.scale = initialScale;
    this.rotation = initialRotation;
    this.transformation = Matrix4.IdentityMatrix();
    this.children = [];
  }

  update(deltaTime) {
    ValidateArguments([Number], arguments);
    this.children.forEach(function(child) {
      child.update(deltaTime);
    });
  }

  draw(parentTransformation = MyMatrix4.IdentityMatrix()) {
    ValidateArguments([Matrix4], arguments, 0);
    // Scale is not passed onto children
    transformation = parentTransformation.multiply(Matrix4.TranslationMatrix(this.position)).
      multiply(Matrix4.RollPitchYawRotationMatrix(this.rotation.z, this.rotation.x, this.rotation.y));

      this.children.forEach(function(child) {
        child.draw(transformation);
      });

    transformation = transformation.multiply(Matrix4.ScaleMatrix(this.scale.x, this.scale.y, this.scale.z));
  }
}
