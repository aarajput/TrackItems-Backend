const fs = require('fs-extra');
const path = require('path');
const randomString = require('randomstring');
const moment = require('moment');
const ItemModel = require('./../models/item_model');

exports.postItem = async (ctx,next)=> {
    const input = _.clone(ctx.request.body);

    const res = await new ItemModel().save(input);

    ctx.state.data={};

    await next();
};

exports.getItems = async (ctx,next) => {
    ctx.state.data = await new ItemModel().get();
    await next();
};