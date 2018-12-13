// description: Compare 2 nodes to check that they have the same keys

// nodesKeyComparator.js
// Compare 2 nodes to check that they have the same keys
// Important: Values are not compared !
// Inputs are
//    - 2 nodes to compare (path to the node in the form of an array)
// Creator:   Dimitris for customer POC
// Version:   1.1 - For Sweagle 2.23, handles new error format in JSON
//
var fromNode=["assignedRelease","webportal1-2.1.2","ui-1.1","json","mi6-options","fields","gadget","optionLabels"]
var toNode=["assignedRelease","webportal1-2.1.2","ui-1.1","json","mi6-schema","properties","gadget","enum"]


var fromSubset = metadataset;
var toSubset = metadataset;
var errorFound = false;
var errorMsg = "";

// Return the subset of a metadataset based on path provided as array
function getSubset(subset, args) {
  // we loop through all provided arguments (= nodeNames in the path) and check if the path exist
  // when we get to the last argument we return whole metadataset at that last nodeName.
  for (var i = 0; i < args.length; i++) {
      	// check if path is valid and if so store all data in subset
  	if (subset.hasOwnProperty(args[i]) === true) {
  		subset = subset[args[i]];
  	}
  	// if not valid return error message
  	else {
  	    // ERROR : Path not found
  	    return false;
  	}
  }
  return subset;
}

fromSubset = getSubset(fromSubset,fromNode);
toSubset = getSubset(toSubset,toNode);

var sizeFromSubset = Object.keys(fromSubset).length;
var sizeToSubset = Object.keys(toSubset).length;

// Check if any path were not found
if (sizeFromSubset == 0) {
  errorFound = true;
  errorMsg = errorMsg+"ERROR: Node "+fromNode+" not found.\n";
}
if (sizeToSubset == 0) {
  errorFound = true;
  errorMsg = errorMsg+"ERROR: Node "+toNode+" not found.\n";
}

if (!errorFound) {
  // Check length of both subsets
  if (sizeFromSubset != sizeToSubset) {
    errorFound = true;
    errorMsg = "ERROR: Node "+fromNode+" and node "+toNode+" don't have same number of properties.\n";
  }
  // compare both subsets
  for (var item in fromSubset) {
    if (!(toSubset.hasOwnProperty(item))) {
      errorFound = true;
      errorMsg = errorMsg+"ERROR: Node "+toNode+" doesn't have property "+item+".\n"
    }
  }
  for (var item in toSubset) {
    if (!(fromSubset.hasOwnProperty(item))) {
      errorFound = true;
      errorMsg = errorMsg+"ERROR: Node "+fromNode+" doesn't have property "+item+".\n"
    }
  }
}
return {"result":!errorFound,"description":errorMsg};
