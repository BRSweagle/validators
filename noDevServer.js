// description: Check if values contains a string identifying a DEV server

// noDevServer.js
// For each key in MDS, check if value contains a string identifying a DEV server
// Creator:   Dimitris Finas for customer POC
// Creator:   Use substringValidator.js as source
// Version:   1.0
//

// Define keywords in key values that defines a DEV server
 var keyValuesWithDevServer = [
  "XXX"
];

// searches is list of all key matching keywords
var searches = {};
// errorFound is a local variable that founds errors
var errorFound = false;
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
      if (mds[item].toLowerCase().includes(searchValue.toLowerCase())) {
          errorFound = true;
          break;
      }
    }
  }
}

// here we call our function with different search terms
for(var i= 0; i < keyValuesWithDevServer.length; i++) {
  searchSubstring(metadataset, keyValuesWithDevServer[i]);
  if (errorFound) {
    return false;
  }
}

/**
 * It returns true when there are no errors (no values found without the given search value)
 * It returns false when at least one error is found
 */
return true;
