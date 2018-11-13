// description: Check unique values for a given keys list

var keyNames = ["find.case.keys"];
var keysFound ={};
var errorFound = false;

function findObjectKeys(mds) {
  for (var item in mds) {
    if  (typeof (mds[item]) === "object") {
      findObjectKeys (mds[item]);
    }
    else{
      if (keyNames.includes(item)) {
        if (keysFound.hasOwnProperty(item)) {
          if (keysFound[item] !== mds[item]) {
            errorFound = true;
            break;
          }
        } else {
          keysFound[item] = mds[item];
        }
      }
    }
  }
}


findObjectKeys(metadataset);
return !errorFound;
