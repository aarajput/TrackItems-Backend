const Model = require('./model');
const config = require('config');


class ItemModel extends Model {
    constructor() {
        super('items','I',);
    }
}


module.exports = ItemModel;