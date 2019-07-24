// description: Check if docker image tags respect expected format

// dockerCheck-tags.js
// Creator:   Dimitris
// Version:   1.0 - First
//
var imageExpectedFormat = "^.*:([0-9]+.?)+([-_]{1}[A-Za-z0-9.]+)?$" ;
var keyToSearch = "image";
var errorFound = false;
var errors = [];
var description = '';

checkKeyValuesByName(metadataset, keyToSearch, imageExpectedFormat);

description = errors.join(', ');
return {description: description, result:!errorFound};


// Check that values of all key with specified names matches a regex
// nodes are not taken into account
// If not found, then "ERROR: NOT FOUND" is returned
function checkKeyValuesByName (mds, keyName, regex) {
  var found = false;
  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset of the object
      found = checkKeyValuesByName(mds[item], keyName, regex);
    } else {
      // check if the key match expected regex
      if (item === keyName ) {
        if (! mds[item].match(regex)) {
          errorFound = true;
          errors.push("*** For key ("+item+"): value ("+ mds[item]+") doesn't respect good practises !");
        };
        return true
      }
    }
  }
  return found;
}
