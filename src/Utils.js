// jshint esversion: 6

function CheckArgAgainstType(type, arg) {
  // If the type provided is a function (ie. prototype), then we will compare
  // the argument provided against that type.
  // Otherwise, if the type provided is not a function, then a user error is
  // assumed and an exception is thrown stating that the argument cannot be
  // checked against the given type.
  if (typeof type === "function") {
    if (new arg.constructor() instanceof type) {
      return type;
    }
  } else {
    throw new TypeError("Cannot check parameter against invalid type: " + typeof type);
  }
}

function ValidateArguments(types, args, requiredArgCount = types.length) {
  // Check parameters to this function.
  if (!(types instanceof Array) || !(args instanceof Object) || typeof requiredArgCount !== "number") {
    throw new Error("Failure to provide valid parameters to ValidateArguments: " +
      "types(" + types + "), " +
      "args(" + args + "), " +
      "requiredArgCount(" + requiredArgCount + ")");
  }

  // Check the number of parameter types is at least the required amount for the
  // function.
  if (types.length < requiredArgCount) {
    throw new Error("Failure to provide enough types to check all required parameters: " + requiredArgCount + " required but only " + types.length + " given");
  }

  // Check the number of input parameters is at least the required amount for
  // the function.
  if (args.length < requiredArgCount) {
    throw new Error("Failure to provide all required parameters:  " + requiredArgCount + " required but only " + args.length + " given");
  }

  // Define local callback for Array.prototype.find for the loop body in case
  // we have a multi type allowance for an agrument.
  var argCheck = function(type) {
    return CheckArgAgainstType(type, this);
  };

  // Define local callback for Array.prototype.map to get all of the type names
  // in an array of types.
  var getTypeName = function(type) {
    return type.name;
  };

  // If we get here, we know that we have enough input types as well as input
  // parameters, so we will iterate through both arrays up to the length of the
  // shorter one.
  for (var i = 0; i < Math.min(types.length, args.length); i++) {
    // If the type provided at the current index is an array (presumably of
    // types), then we will attempt to find the type in that array with which
    // the argument at the current index matches. That way, we can allow several
    // types to satisfy the function for that argument.
    // Otherwise, if the type provided at the current index is not an array,
    // then we assume it is a function (a prototype) and attempt to compare the
    // argument at the current index against it.
    if (types[i] instanceof Array) {
      if (types[i].find(argCheck, args[i]) === undefined) {
        var typenames = types[i].map(getTypeName);
        throw new TypeError("Invalid parameter " + i + ": expected one of [" + typenames + "] but got " + args[i].constructor.name);
      }
    } else {
      if (CheckArgAgainstType(types[i], args[i]) === undefined) {
        throw new TypeError("Invalid parameter " + i + ": expected " + types[i].name + " but got " + args[i].constructor.name);
      }
    }
  }
}
