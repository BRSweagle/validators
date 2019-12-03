// description: Checks if all keynames respect naming conventions

// validateKeyName.js
// Creator:   Dimitris for customer POC
// Version:   1.0 - First release
//

var rootName = Object.keys(metadataset)[0];
var root = metadataset[rootName];
var namingConventionNode=root.namingConvention;
var maxLength=namingConventionNode.max_length;
var approvedPrefixArray=Object.keys(namingConventionNode.prefix);
var exceptionList= ["TRIGRAMME"];

//console.log("maxLength="+maxLength);
//console.log(approvedPrefixArray);

// Defines if error must include full path of key found
var includePath = false;
// Defines the max number of errors to return
var maxErrorDisplay = 10;
var errorFound = false;
var errors = [];
var description = '';
var pathSeparator = '/';

checkKeyNames(metadataset, '');

if (errors.length > 0) {
  errorFound = true;
  if (errors.length < maxErrorDisplay) { description = "ERRORS: " + errors.join('. '); }
  else { description = "ERRORS: only first "+maxErrorDisplay+" errors are displayed: " + errors.join('. '); }
} else { description = "Validation passed successfully"; }

return {description: description, result:!errorFound};


function checkKeyNames(mds, path) {
  for (var item in mds) {
    if (errors.length >= maxErrorDisplay) { break; }
    if (typeof mds[item] === 'object') { checkKeyNames(mds[item], path + item + pathSeparator); }
    else if (!exceptionList.includes(item)) {
      var tempError="";
      // Check if length is correct
      if (maxLength !==0 && item.length > maxLength) {
				if (includePath) { tempError = "Key ("+path+item+") length is superior to "+maxLength; }
				else { tempError = "Key ("+item+") length is superior to "+maxLength; }
        errors.push(tempError);
			}
      // Check if prefix is correct
      var findOne = false;
      for (var i=0; i<approvedPrefixArray.length; i++) {
        if (item.startsWith(approvedPrefixArray[i])) { findOne=true; break; }
      }
      if (!findOne) {
        if (includePath) { tempError = "Key ("+path+item+") prefix is incorrect"; }
				else { tempError = "Key ("+item+") prefix is incorrect"; }
        errors.push(tempError);
      }

		}
  }
}
