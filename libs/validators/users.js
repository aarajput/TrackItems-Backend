const  Joi = require('joi');
const patterns = require('./../utils/patterns');
const UserModel = require('./../models/user_model');

exports.registerUser = async (ctx,next)=> {
    const schema = Joi.object().keys({
            fullName:Joi.string().min(3).max(50).required(),
            email:Joi.string().min(3).max(50).regex(patterns.EMAIL_ADDRESS).required(),
            password:Joi.string().min(6).max(50).required()
    });
    const {error,value} = Joi.validate(ctx.request.body,schema);
    if(error) {
        const  msg = _.first(error.details).message;
        ctx.throw(400,msg)
    }

    const user = await new UserModel().get({email:value.email});

    if(user.length>0)
        ctx.throw(400,'email already exist');
    else
        ctx.state.input = value;
    await next();
};


exports.loginUser = async (ctx,next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().min(3).max(50).regex(patterns.EMAIL_ADDRESS).required(),
        password:Joi.string().min(6).max(50).required()
    });
    const {error,value} = Joi.validate(ctx.request.body,schema);
    if(error) {
        const  msg = _.first(error.details).message;
        ctx.throw(400,msg)
    }

    const user = await new UserModel().getUserWithToken(value);

    if(user.length===0)
        ctx.throw(401,'User not found');
    else
    {
        ctx.state.input = value;
        ctx.state.user = _.first(user)
    }
    await next();
};