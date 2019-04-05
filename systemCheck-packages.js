// description: Validates list of package of a server

// systemCheck-packages.js
// Creator:   Stefan/Dimitris for customer POC
// Version:   1.0 - First
//
var rootName = Object.keys(metadataset)[0];
var root = metadataset[rootName];
var approvedPackages = root.approved.system.packages;
var maxDisplay = 5;

var errorFound = false;
var errors = [];
var description = '';


if (approvedPackages == undefined) {
    return {description: "*** ERROR: Approved list not found ", result: false};
}

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
  var unallowedPackages = [];
  var versionMismatches = [];
  // check whether all packages are of correct version
  for (var pack in subset.system.packages) {
      if(typeof(approvedPackages[pack]) === 'undefined') {
          unallowedPackages.push(pack);
      } else if (approvedPackages[pack] != subset.system.packages[pack]) {
          versionMismatches.push(pack + ' => ' + subset.system.packages[pack] + '<>' + approvedPackages[pack]);
      }
  }
  if (unallowedPackages.length > 0 || versionMismatches.length > 0) {
      errorFound=true;
      if (unallowedPackages.length > 0) {
          var min = Math.min(unallowedPackages.length, maxDisplay);
          errors.push('*** For server ('+serverName+'): ' + unallowedPackages.length + ' non allowed packages were found. First ' + min + ' are:');
          for (var i = 0; i < min; i++) {
            errors.push(unallowedPackages[i]);
          }
      }
      if (versionMismatches.length > 0) {
          var min = Math.min(unallowedPackages.length, maxDisplay);
          errors.push('*** For server ('+serverName+'): ' + versionMismatches.length + ' packages in wrong version found. First ' + min + ' are:');
          for (var i = 0; i < min; i++) {
            errors.push(versionMismatches[i]);
          }
      }
    } else {
      errors.push('*** For server ('+serverName+'): All packages are allowed and on the correct version');
    }
}
