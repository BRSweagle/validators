//
// nodesKeyComparator.js
// Compare 2 nodes to check that they have the same keys
// Inputs are
//    - 2 nodes to compare (path to the node in the form of an array)
// Creator:   Dimitris for customer POC
// Version:   1.0
//
var fromNode = ["releases","dev"];
var toNode = ["releases","tst"];

var fromSubset = metadataset;
var toSubset = metadataset;

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
  		return "ERROR: path not found: " + args[i];
  	}
  // keep looping through the provided arguments.
  // when last node is reached, subset contains the data we are looking for
  }
  return subset;
}

fromSubset = getSubset(fromSubset,fromNode);
toSubset = getSubset(toSubset,toNode);

// Check length of both subsets
if (Object.keys(fromSubset).length != Object.keys(toSubset).length) {
  return false;
}

// compare both subsets
for (var item in fromSubset) {
  if (!(toSubset.hasOwnProperty(item))) {
    return false;
  }
}

return true;
