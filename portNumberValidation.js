// description: Check if a key that corresponds to a portNumber has a value above a given threshold
// Version:   1.1 - For Sweagle 2.23, handles new error format in JSON

 var keysWithThreasholds = {
  "env.core.server.port" : 1024,
  "env.db.port" : 78897
};

var errorFound = false;
var errorMsg = "";
/**
 * searchport function searches the whole metadataset to find the given searchkey and compare it with the given threshold
 * mds must be the given metadataset, searchKey must be the key we want to check, threshold must be the numeric limit
 */
function searchport (mds, searchKey, threshold) {
  for (var item in mds) {
    // check if the key has a value or points to an object
    if  (typeof (mds[item]) === "object") {
      // if value is an object call recursively the function to search this subset of the object
      searchport (mds[item], searchKey, threshold);
    }
    else{
      // check if the key equals to the search term
      if (item === searchKey ) {
        // check if the value is not above the given threshold
        if  (!(mds[item].length > 0 && Number(mds[item]) > threshold)) {
          errorsFound = true;
          errorMsg = errorMsg+"ERROR: Port "+item+" has a value of "+mds[item]+" below required threshold of "+threshold+".\n";
        }
      }
    }
  }
}
// Here we can call our function with different search terms and thresholds
for (var obj in keysWithThreasholds) {
  searchport(metadataset, obj, keysWithThreasholds[obj]);
}

return {"result":!errorFound,"description":errorMsg};
