// jshint esversion: 6

/**
 * A class to represent color objects using red, green, blue, and alpha color
 * channels.
 * @class
 */
class ColorRGBA {
  /**
   * @param {Number} [red=0.0] A quantity from 0.0 to 1.0 for the color's red
                               channel.
   * @param {Number} [green=0.0] A quantity from 0.0 to 1.0 for the color's
                                 green channel.
   * @param {Number} [blue=0.0] A quantity from 0.0 to 1.0 for the color's blue
                                channel.
   * @param {Number} [alpha=1.0] A quantity from 0.0 to 1.0 representing the
                                 color's transparency.
   */
  constructor(red = 0.0, green = 0.0, blue = 0.0, alpha = 1.0) {
    ValidateArguments([Number, Number, Number, Number], arguments, 0);

    /**
     * A quantity from 0.0 to 1.0 for the color's red channel.
     * @type {Number}
     */
    this.red = red;

    /**
     * A quantity from 0.0 to 1.0 for the color's green channel.
     * @type {Number}
     */
    this.green = green;

    /**
     * A quantity from 0.0 to 1.0 for the color's blue channel.
     * @type {Number}
     */
    this.blue = blue;

    /**
     * A quantity from 0.0 to 1.0 representing the color's transparency.
     * @type {Number}
     */
    this.alpha = alpha;
  }

  /**
   * Returns the color object converted into an array with values for red,
   * green, blue, and alpha at indices 0, 1, 2, and 3, respectively.
   * @type {Number[]}
   */
  get toArray() {
    return [this.red, this.green, this.blue, this.alpha];
  }

  /**
   * Returns ColorRGBA.toArray converted into a Float32Array.
   * @type {Float32Array}
   */
  get toFloat32Array() {
    return new Float32Array(this.toArray);
  }
}

/**
 * A class to hold various instances of well known colors for easy retrieval.
 * @class
 */
class Colors {
  /**
   * <strong>Cannot be instantiated.</strong>
   */
  constructor() {
    if (new.target === Colors) {
      throw new TypeError("Cannot construct instances of abstract class: " + new.target);
    }
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Black</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Black() {
    this.__black = this.__black || new ColorRGBA(0.0, 0.0, 0.0, 1.0);
    return this.__black;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Blue</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Blue() {
    this.__blue = this.__blue || new ColorRGBA(0.0, 0.0, 1.0, 1.0);
    return this.__blue;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Cornflower
     Blue</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get CornflowerBlue() {
    this.__cornflowerBlue = this.__cornflowerBlue || new ColorRGBA(100.0 / 255.0, 149.0 / 255.0, 237.0 / 255.0, 1.0);
    return this.__cornflowerBlue;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Cyan</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Cyan() {
    this.__cyan = this.__cyan || new ColorRGBA(0.0, 1.0, 1.0, 1.0);
    return this.__cyan;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Green</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Green() {
    this.__green = this.__green || new ColorRGBA(0.0, 1.0, 0.0, 1.0);
    return this.__green;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Magenta</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Magenta() {
    this.__magenta = this.__magenta || new ColorRGBA(1.0, 0.0, 1.0, 1.0);
    return this.__magenta;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Red</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Red() {
    this.__red = this.__red || new ColorRGBA(1.0, 0.0, 0.0, 1.0);
    return this.__red;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>White</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get White() {
    this.__white = this.__white || new ColorRGBA(1.0, 1.0, 1.0, 1.0);
    return this.__white;
  }

  /**
   * Returns a ColorRGBA object representing the color <strong>Yellow</strong>.
   * @static
   * @type {ColorRGBA}
   */
  static get Yellow() {
    this.__yellow = this.__yellow || new ColorRGBA(1.0, 1.0, 0.0, 1.0);
    return this.__yellow;
  }
}
