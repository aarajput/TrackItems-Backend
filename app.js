//root directory
global._dirRoot = __dirname;

const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');
const json = require('koa-json');
const index = require('./routes/index');
const error = require('koa-json-error');
const log = require('./libs/utils/logger');
const serve = require('koa-static');
const commonMiddlewares = require('./libs/middlewares/common');

// error handler
app.use(error(err=>{
    let obj =  {
        'meta-data':{
            statusCode:err.statusCode,
            message:err.message
        }
    };
    if(process.env.NODE_ENV !== 'production' && !err.statusCode)
        obj["meta-data"].stack = err.stack;
    if(err.data)
        obj.data = err.data;
    return obj;
}));

// global middlewares
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(commonMiddlewares.jsonContentType);

// routes definition
app.use(index.routes(), index.allowedMethods());

app.use(commonMiddlewares.printResponse);

//static pages in public folder
app.use(serve(__dirname + '/public'));


// error-handling
app.on('error', async (err, ctx) => { log.error(err); });

module.exports = app;
