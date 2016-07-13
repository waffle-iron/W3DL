// jshint esversion: 6

/**
 * @todo Documentation.
 * @file
 * @requires {@link IndexedVertexArray.js}
 * @requires {@link Material.js}
 * @requires {@link Object3D.js}
 * @requires {@link ShaderProgram.js}
 * @see GraphicsObject3D
 */

/**
 * @todo Documentation.
 * @class
 * @extends Object3D
 */
class GraphicsObject3D extends Object3D {
  constructor(vertexArray = null, position = new Vector3D(), scale = new Vector3D(1, 1, 1), rotation = new Vector3D()) {
    W3DUtils.ValidateArguments([IndexedVertexArray, Vector3D, Vector3D, Vector3D], arguments, 0);
    super(position, scale, rotation);
    this.vertices = vertexArray;
    this.shaderProgram = null;
    this.objectMaterial = null;
  }

  initialize(shader, material, recursive = false, vertexArray = null, recursiveVAO = false) {
    W3DUtils.ValidateArguments([ShaderProgram, Material, Boolean, IndexedVertexArray, Boolean], arguments, 2);
    if (recursive)
    {
      this.children.forEach(function(child) {
        if (recursiveVAO) {
          ((GraphicsObject3D)(child)).initialize(shader, material, recursive, vertexArray, recursiveVAO);
        } else {
          ((GraphicsObject3D)(child)).initialize(shader, material, recursive);
        }
      });
      this.shaderProgram = shader;
      this.objectMaterial = material;
      if (vertexArray) this.vertices = vertexArray;
    }
  }

  draw(parentTransformation = Matrix4.IdentityMatrix()) {
    W3DUtils.ValidateArguments([Matrix4], arguments, 0);
    super.draw(parentTransformation);
    if (this.shaderProgram) {
      /** @todo draw implementation */
    }
  }

  setInheritedShader(shader) {
    W3DUtils.ValidateArguments([ShaderProgram], arguments);
    this.children.forEach(function(child) {
      ((GraphicsObject3D)(child)).setInheritedShader(shader);
    });
    this.shaderProgram = shader;
  }

  setInheritedMaterial(material) {
    W3DUtils.ValidateArguments([Material], arguments);
    this.children.forEach(function(child) {
      ((GraphicsObject3D)(child)).setInheritedMaterial(material);
    });
    this.objectMaterial = material;
  }
}
