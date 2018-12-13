// description: Check if values contains a string identifying a DEV value (like DEV server or DEBUG log level)

// noDevValue.js
// For each key in MDS, check if value contains a string identifying a DEV server
// Creator:   Dimitris Finas for customer POC
// Creator:   Use substringValidator.js as source
// Version:   1.1 - add exception list
//

// Define keywords in key values that defines a DEV value
// like a DEV server, or DEBUG log level, or HTTP url instead of HTTPS
 var keyValuesWithDevValue = [
  "DEBUG",
  "http:/"
];

// List of keys that won't be checked
var exceptionList= [
    "KEYNAME"
    ];


// searches is list of all key matching the rule
// This will be used when validators allows custom error messages
var searches = {};
// errorFound is a local variable that founds errors
var errorFound = false;
var errorMsg = "";
/**
 * searchSubsting function searches the whole metadataset to find keys that include a given substring
 *
 * mds must be the given metadataset,
 * searchValue must be the string we want check in the values
 */
function searchSubstring (mds, searchValue) {

  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset of the object
      searchSubstring (mds[item], searchValue);
    } else {
      // check if the key contains the search term
      if (mds[item].toLowerCase().includes(searchValue)) {
        var exception = false;
        for(var exc=0; exc < exceptionList.length; exc++) {
          if (item.toLowerCase() === exceptionList[exc].toLowerCase()) {
              exception=true;
              break;
          }
        }
        if (exception === false) {
          errorFound = true;
          errorMsg = errorMsg+"ERROR: key "+item+" contains DEV value: "+mds[item]+".\n"
          break;
        }
      }
    }
  }
}

// here we call our function with different search terms
for(var i= 0; i < keyValuesWithDevValue.length; i++) {
  searchSubstring(metadataset, keyValuesWithDevValue[i].toLowerCase());
}

 return {"result":!errorFound,"description":errorMsg};
