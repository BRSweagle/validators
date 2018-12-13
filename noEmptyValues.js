// description: Check that all keys have values
// errorMsg: All keys must have a value !

// noEmptyValues.js
// Check that all keys have values
// Creator:   Dimitris Finas for customer POC
// Version:   1.2 - For Sweagle 2.23, handles new error format in JSON
//

// List of keys that won't be checked
var exceptionList= [
    "KEYNAME"
    ];

var errorFound = false;
var errorMsg = "";

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
          var exception = false;
          for(var exc=0; exc < exceptionList.length; exc++) {
            if (item.toLowerCase() === exceptionList[exc].toLowerCase()) {
                exception=true;
                break;
            }
          }
          if (exception === false) {
            errorFound = true;
            errorMsg = errorMsg+"ERROR: key "+item+" must have a value.\n"
            break;
          }
        }
    }
  }
}

checkValue(metadataset);
return {"result":!errorFound,"description":errorMsg};
