// jshint esversion: 6

/**
 * Common math functions to be used globally.
 * @namespace
 */
var W3DMath = {
  /**
   * Converts an angle represented in degrees to an angle represented in
   * radians.
   * @param {Number} a An angle represented in degrees.
   * @returns {Number} An angle represented in radians.
   */
  DegreeToRadian: function(a) {
    W3DUtils.ValidateArguments([Number], arguments);
    return (a * Math.PI / 180.0);
  },

  /**
   * Converts an angle represented in radians to an angle represented in
   * degrees.
   * @param {Number} a An angle represented in radians.
   * @returns {Number} An angle represented in degrees.
   */
  RadianToDegree: function(a) {
    W3DUtils.ValidateArguments([Number], arguments);
    return (a * 180.0 / Math.PI);
  },

  /**
   * Finds the linear interpolation between two values <tt>a</tt> and <tt>b</tt>
   * at the interpolation ratio <tt>t</tt>.
   * @param {Number} a The value interpolating from.
   * @param {Number} b The value interpolating to.
   * @param {Number} t The interpolation ratio from <tt>a</tt> to <tt>b</tt>.
   * @returns {Number} The linear interpolation between <tt>a</tt> and
              <tt>b</tt> at the interpolation ratio <tt>t</tt>.
   */
  Lerp: function(a, b, t) {
    W3DUtils.ValidateArguments([Number, Number, Number], arguments);
    if (t > 1 || t < 0)
    {
      t -= Math.floor(t);
    }
    return ((1 - t) * a) + (t * b);
  }
};
