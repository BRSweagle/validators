// description: Check if password values are encrypted

// passwordChecker.js
// For each key that is suspected to be a password, check if value is put as sensitive data
// Creator:   Dimitris Finas for customer POC
// Creator:   Use substringValidator.js as source
// Version:   1.1
//

// Define keywords in key name that defines a password
 var keyNamesWithPasswordValues = [
  "pass",
  "pwd",
// For test purpose (uncomment for wrong matching):
//  "name",
  "password"
];

// searches is list of all key matching keywords
var searches = {};
// errorFound is a local variable that founds errors
var errorFound = false;
/**
 * searchSubsting function searches the whole metadataset to find keys that include a given substring
 * and checks if their values is protected as sensitive data
 *
 * mds must be the given metadataset,
 * searchKey must be the string we want to check in the keys,
 * searchValue must be the string we want check in the values
 */
function searchSubstring (mds, searchKey) {

  if (searches.hasOwnProperty(searchKey) === false) {
    searches[searchKey] = false;
  }
  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset of the object
      searchSubstring (mds[item], searchKey);
    } else {
      // check if the key contains the search term
      if (item.toLowerCase().includes(searchKey.toLowerCase())) {
        searches[searchKey] = true;
        // check if the value equals "..." which means protected for Sweagle
        if  (!(mds[item] === "...")){
          errorFound = true;
          break;
        }
      }
    }
  }
}

// here we call our function with different search terms
for(var i= 0; i < keyNamesWithPasswordValues.length; i++) {
  searchSubstring(metadataset, keyNamesWithPasswordValues[i]);
  // Exit as soon as a error is found
  if (errorFound) {
    return false;
  }
}

/**
 * It returns true when there are no errors (no values found without the given search value)
 * It returns false when at least one error is found
 */

return true;
