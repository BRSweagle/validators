// description: Check that they are no duplicate keys in MDS

// dublicateKeysCaseSensitive.js
// Version:   1.1 - For Sweagle 2.23, handles new error format in JSON

var skipSameValue = false;
var errorFound = false;
var errorMsg = "Validation passed successfully";

function duplicateKeyNames (mds) {
  var	keyNames = Object.keys(mds);
  for (var item in mds) {
    if  (typeof (mds[item]) === "object") {
      duplicateKeyNames (mds[item]);
    } else {
      for (var i = 0; i<keyNames.length; i++) {
        if (item.toUpperCase() === keyNames[i].toUpperCase() && item !== keyNames[i]) {
          if ( skipSameValue === true) {
			      if (mds[item] !== mds[keyNames[i]]) {
              errorFound = true;
              errorMsg = "ERROR: Duplicate key found for:" + item;
              break;
			      }
          } else {
            errorFound = true;
            errorMsg = "ERROR: Duplicate key found for:" + item;
			      break;
          }
        }
		  }
		}
  }
}

duplicateKeyNames (metadataset);
return {"result":!errorFound,"description":errorMsg};
