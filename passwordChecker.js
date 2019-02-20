// description: Check if password values are encrypted

// passwordChecker.js
// For each key that is suspected to be a password, check if value is put as sensitive data
// Creator:   Dimitris Finas for customer POC
// Creator:   Use substringValidator.js as source
// Version:   1.4 - Add param to manage full path or just keyname in error message
//

// Define keywords in key name that defines a password
 var keyNamesWithPasswordValues = [
//  "password", This is already handled by "pass" below
  "pass",
  "pwd",
  "secret"
];

var exceptionList= [
    "KEYNAME"
    ];

// searches is list of all key matching keywords
var searches = {};
// defines if error msg includes path or not
var errorFullPath = false;
var errorFound = false;
var errorMsg = "";
/**
 * searchSubsting function searches the whole metadataset to find keys that include a given substring
 * and checks if their values is protected as sensitive data
 *
 * mds must be the given metadataset,
 * searchKey must be the string we want to check in the keys,
 * searchValue must be the string we want check in the values
 */
function searchSubstring (mds, searchKey, path) {

  if (searches.hasOwnProperty(searchKey) === false) {
    searches[searchKey] = false;
  }
  for (var item in mds) {
    var path=path.concat('/' + item);
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset of the object
      searchSubstring (mds[item], searchKey, path);
    } else {
      // check if the key contains the search term
      if (item.toLowerCase().includes(searchKey)) {
        // check if not in exception list
        var exception = false;
        for(var exc=0; exc < exceptionList.length; exc++) {
          if (item.toLowerCase() === exceptionList[exc].toLowerCase()) {
              exception=true;
              break;
          }
        }
        if (exception === false) {
            searches[searchKey] = true;
            // check if the value contains the given subvalue
            if  (!(mds[item] === "...")){
              errorFound = true;
              if (errorFullPath) {
                errorMsg = errorMsg+"ERROR: Key "+path+" is not encrypted.\n";
              } else {
                errorMsg = errorMsg+"ERROR: Key "+item+" is not encrypted.\n";
              }
              break;
            }
        }
      }
    }
  }
}

// here we call our function with different search terms
for(var i= 0; i < keyNamesWithPasswordValues.length; i++) {
  searchSubstring(metadataset, keyNamesWithPasswordValues[i].toLowerCase(), '');
}

return {"result":!errorFound,"description":errorMsg};
