// description: Compare 2 nodes to check that some values are identical and others are different

// envsComparator.js
// Compare 2 nodes to check that some values are identical and others are different
// Inputs are
//    - 2 nodes to compare
//    - List of keys that must have same values
//    - List of keys that must have different values
// Creator:   Stefanos for customer POC
// Version:   1.0
//
var fromEnv = "qualif";
var toEnv = "preprod";


var sameValues = [
    "autoConfirmIdentical",
    "fromName"
];

var diffValues = [
    "senderUrl",
    "password"
];


var fromEnvFlattened = {};
var toEnvFlattened = {};

var errorFound = false;

function flattenObject (environment , flatObject) {
    for (var item in environment) {
        if (typeof (environment[item]) === "object") {
            flattenObject(environment[item] , flatObject);
        }else {
            if (sameValues.includes(item) || diffValues.includes(item)) {
                flatObject[item] = environment[item];
            }
        }
    }
}


if (metadataset && metadataset.hasOwnProperty('environments')) {
    if ( metadataset.environments.hasOwnProperty(fromEnv) ) {
        flattenObject(metadataset.environments[fromEnv] , fromEnvFlattened);
    }else {
        errorFound = true;
    }
    if ( metadataset.environments.hasOwnProperty(toEnv) ) {
        flattenObject(metadataset.environments[toEnv] , toEnvFlattened);
    }else {
        errorFound = true;
    }
}
if (!errorFound) {
    for (var i = 0 ; i < sameValues.length; i++ ) {
        if ( fromEnvFlattened[sameValues[i]] !== toEnvFlattened[sameValues[i]] ) {
            errorFound = true;
            break;
        }
    }
}

if (!errorFound) {
    for (var i = 0 ; i < diffValues.length; i++ ) {
        if ( fromEnvFlattened[diffValues[i]] === toEnvFlattened[diffValues[i]] ) {
            errorFound = true;
            break;
        }
    }
}


return !errorFound;
