// description: Checks if kernel version of a server is in approved list

// systemCheck-kernel.js
// Creator:   Stefan/Dimitris for customer POC
// Version:   1.0 - First
//
var rootName = Object.keys(metadataset)[0];
var root = metadataset[rootName];
var approvedNode = root.approved.system.os.versions;
var kernelPath = "system/os/uname";

var errorFound = false;
var errors = [];
var description = '';

if (approvedNode == undefined) {
    return {description: "*** ERROR: Approved list not found ", result: false};
}
var approvedArray = Object.keys(approvedNode);

if (rootName == "servers") {
  // MDS is list of servers check all of them
  for (var server in root) {
      if (server == 'approved') { continue; }
      check(server, root[server]);
  }
} else {
  // MDS is one server, check it
  check(rootName, root);
}

description = errors.join(', ');
return {description: description, result:!errorFound};

function check(serverName, subset) {
	var kernel = getValueByPath(subset, kernelPath);
  if (kernel == "ERROR: NOT FOUND") {
    errorFound = true;
    errors.push("*** For server ("+serverName+"), kernel version not found");
    return errorFound;
  }
	if(!approvedArray.includes(kernel)) {
			errorFound = true;
			errors.push("*** For server ("+serverName+"): kernel version ("+ kernel +") is not approved !");
	}
}

// Return the value of a specific key based on its complete path
// If the key is a node, then it returns a subset
// If not found, then "ERROR: NOT FOUND" is returned
function getValueByPath(mds, path) {
  var pathSeparator = '/';
  var pathSteps =  path.split(pathSeparator);
  var subset = mds;
  for (var i = 0; i < pathSteps.length; i++ ) {
    if (subset.hasOwnProperty(pathSteps[i])) {
      subset = subset[pathSteps[i]];
    } else {
      return "ERROR: NOT FOUND";
    }
  }
  return subset;
}
