const fs = require('fs-extra');
const path = require('path');
const randomString = require('randomstring');
const moment = require('moment');
const ItemModel = require('./../models/item_model');

exports.postItem = async (ctx,next)=> {
    const input = _.clone(ctx.request.body.fields);

    const file = ctx.request.body.files.image;
    const nestedDirName = `${randomString.generate(10)}_${moment().unix()}`;
    await fs.move(file.path,path.join(_dirRoot,'public','item_images',nestedDirName,file.name));

    input.imageName=nestedDirName+'/'+file.name;

    const res = await new ItemModel().save(input);

    ctx.state.data={};

    await next();
};

exports.getItems = async (ctx,next) => {
    ctx.state.data = await new ItemModel().getWithImage();
    await next();
};