// jshint esversion: 6

function DegreeToRadian(a) {
  ValidateArguments([Number], arguments);
  return (a * Math.PI / 180.0);
}

function RadianToDegree(a) {
  ValidateArguments([Number], arguments);
  return (a * 180.0 / Math.PI);
}

function Lerp(a, b, t) {
  ValidateArguments([Number, Number, Number], arguments);
  if (t > 1 || t < 0)
  {
    t -= Math.floor(t);
  }
  return ((1 - t) * a) + (t * b);
}
