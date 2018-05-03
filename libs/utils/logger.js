const  fs = require('fs');
const  path = require('path');
const moment = require('moment');

exports.error = err => {
    fs.appendFile(path.join(_dirRoot,'logs','errors.log'),JSON.stringify(
        {
            timestamp:moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            message:err.message,
            stack:err.stack
        })+"\n",()=>{});
};