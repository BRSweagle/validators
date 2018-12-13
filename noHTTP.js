// description: Check if no URL is used with HTTP (only HTTPS allowed)

// noHTTP.js
// Check if no URL is used with HTTP (only HTTPS allowed)
// Creator:   Dimitris Finas for customer POC
// Version:   1.1 - For Sweagle 2.23, handles new error format in JSON
//

var searchValue = "http:/";
var errorFound = false;
var errorMsg = "";

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
          errorMsg = errorMsg+"ERROR: key "+item+" contains an HTTP:// url value.\n";
          break;
        }
    }
  }
}

checkValue(metadataset);

return {"result":!errorFound,"description":errorMsg};
