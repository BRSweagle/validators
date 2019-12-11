## This validator is to check a list of values exist.
## Requires a node within the MDS to contain required keys to check and their required values.
## Create a node within the MDS as below.
##    "allowedValues": {
##      "key": "test1,yolo1",
##      "key2": "test2,test3,test4",
##      "key3": "smth"
##    }
##

var keys = [];
var rules ={};
var errorFound = false;
var wrongKeys = [];
function findAllowedValues(mds) {
  for (var item in mds) {
    if  ( typeof(mds[item]) === 'object') {
        if (item === 'allowedValues') {
            rules = mds[item];
            keys = Object.keys(rules);
            for (var i=0; i < keys.length; i++) {
                rules[keys[i]] = rules[keys[i]].split(',');
            }
            delete mds[item];
            break;
        }
        findAllowedValues (mds[item]);
    }
  }
}
function findKeys(mds, path) {
    for (var item in mds) {
        if (typeof(mds[item]) === 'object') {
            findKeys(mds[item], path + item + '/');
        } else {
            if (keys.includes(item) && !rules[item].includes(mds[item])) {
                var tempKey = 'key: ' + item + ', value: ' + mds[item] + ', path: ' + path;
                wrongKeys.push(tempKey);
                errorFound = true;
            }
        }
    }
}
findAllowedValues(metadataset);
findKeys(metadataset, '');
return {result: !errorFound, description: wrongKeys.join(',')};
