// description: Check is no URL is used with HTTP (only HTTPS allowed)
// errorMsg: Only HTTPS url are allowed !

// noHTTP.js
// Check is no URL is used with HTTP (only HTTPS allowed)
// Creator:   Dimitris Finas for customer POC
// Version:   1.0
//

var errorFound = false;
var searchValue = "http:/";

function checkValue (mds) {

  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset
      checkValue(mds[item]);
    } else {
        // check if the value contains the given subvalue
        if  (mds[item].toLowerCase().includes(searchValue)) {
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
