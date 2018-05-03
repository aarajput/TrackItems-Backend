exports.jsonContentType = async (ctx,next)=>{
  ctx.set('content-type','application/json');
  await next();
};

exports.printResponse = async (ctx,next)=>{
    if(ctx.state.data) {
        ctx.status = 200;
        const status = 200;
        const msg = 'success';
        ctx.body = {
            "meta-data":{
                statusCode:status,
                message:msg
            },
            data:ctx.state.data
        };
    }
    else
        await next()
};