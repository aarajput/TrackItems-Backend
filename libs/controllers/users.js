const UserModel = require('./../models/user_model');
const randomString  = require('randomstring');

exports.registerUser = async (ctx,next) => {
    const  dbObj = UserModel.toDBObject(ctx.state.input);
    dbObj.token = randomString.generate({length:16,charset:'alphanumeric'});
    const ids = await new UserModel().save(dbObj);
    const  result = await new UserModel().getUserWithToken({'U.id':_.first(ids)});
    ctx.state.data = _.first(result);
    await next();
};


exports.loginUser = async (ctx,next)=> {
    if(ctx.state.user) {
        ctx.state.data = ctx.state.user;
    }

    await next();
};


exports.meUser = async (ctx,next)=> {
    if(ctx.state.user) {
        ctx.state.data = await new UserModel().getUserWithToken({id:ctx.state.user.id});
    }
    await next();
};