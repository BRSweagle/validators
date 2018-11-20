// description: Check that all keys have values
// errorMsg: All keys must have a value !

// noEmptyValues.js
// Check that all keys have values
// Creator:   Dimitris Finas for customer POC
// Version:   1.0
//

var errorFound = false;

// Function to check if no value is empty
function checkValue (mds) {

  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function for this subset
      checkValue(mds[item]);
    } else {
        // check if the value contains the given subvalue
        if  (mds[item] === "") {
          errorFound = true;
          break;
        }
    }
  }
}

checkValue(metadataset);
/**
 * errorsFound now is the boolean of errors found.
 * It returns true when there are no errors (no values found without the given search value)
 * It returns false when at least one error is found
 */
if (errorFound) {
  return false;
}

return true;
