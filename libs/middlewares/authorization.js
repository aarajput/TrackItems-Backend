const UserModel = require('./../models/user_model');

module.exports = async (ctx,next)=> {
    let auth = ctx.req.headers.authorization;
    if(!auth)
        ctx.throw(401,'Authorization is required');

    auth = Buffer.from(auth,'base64').toString().split('||');

    if(auth.length!==3)
        ctx.throw(401,'Authorization invalid');

    const users = await new UserModel().get({email:auth[0],token:auth[1],created_on:auth[2]});

    if(users.length===0)
        ctx.throw(401,'Authorization invalid');

    ctx.state.user = _.first(users);

    await next();
};