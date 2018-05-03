const fs = require('fs');
const path = require('path');

global.requireAll = dir=> {
    let requireArray = [];
    fs.readdirSync(dir).forEach(file=>{
        let fileName = file.toString().split('.')[0];
        requireArray[fileName] = require(path.join(dir,fileName));
    });

    return requireArray;
};