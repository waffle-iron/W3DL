// jshint esversion: 6

/**
 * @todo Documentation.
 * @file
 * @requires {@link IndexedVertexArray.js}
 * @requires {@link Material.js}
 * @requires {@link Object3D.js}
 * @requires {@link ShaderProgram.js}
 * @see W3DL.GraphicsObject3D
 */

/**
 * @todo Documentation.
 * @class
 * @extends W3DL.Object3D
 */
W3DL.GraphicsObject3D = class GraphicsObject3D extends W3DL.Object3D {
  constructor(vertexArray = null, position = new W3DL.Vector3D(), scale = new W3DL.Vector3D(1, 1, 1), rotation = new W3DL.Vector3D()) {
    W3DL.Utils.ValidateArguments([W3DL.IndexedVertexArray, W3DL.Vector3D, W3DL.Vector3D, W3DL.Vector3D], arguments, 0);
    super(position, scale, rotation);
    this.vertices = vertexArray;
    this.shaderProgram = null;
    this.objectMaterial = null;
  }

  initialize(shader, material, recursive = false, vertexArray = null, recursiveVAO = false) {
    W3DL.Utils.ValidateArguments([W3DL.ShaderProgram, W3DL.Material, Boolean, W3DL.IndexedVertexArray, Boolean], arguments, 2);
    if (recursive)
    {
      /* TODO: This is a hack and should be removed. */
      this.children.forEach(function(child) {
        if (recursiveVAO) {
          ((W3DL.GraphicsObject3D)(child)).initialize(shader, material, recursive, vertexArray, recursiveVAO);
        } else {
          ((W3DL.GraphicsObject3D)(child)).initialize(shader, material, recursive);
        }
      });
      this.shaderProgram = shader;
      this.objectMaterial = material;
      if (vertexArray) this.vertices = vertexArray;
    }
  }

  draw(parentTransformation = W3DL.Matrix4.IdentityMatrix()) {
    W3DL.Utils.ValidateArguments([W3DL.Matrix4], arguments, 0);
    super.draw(parentTransformation);
    if (this.shaderProgram) {
      /** @todo draw implementation */
    }
  }

  setInheritedShader(shader) {
    W3DL.Utils.ValidateArguments([W3DL.ShaderProgram], arguments);
    this.children.forEach(function(child) {
      ((W3DL.GraphicsObject3D)(child)).setInheritedShader(shader);
    });
    this.shaderProgram = shader;
  }

  setInheritedMaterial(material) {
    W3DL.Utils.ValidateArguments([W3DL.Material], arguments);
    this.children.forEach(function(child) {
      ((W3DL.GraphicsObject3D)(child)).setInheritedMaterial(material);
    });
    this.objectMaterial = material;
  }
};
