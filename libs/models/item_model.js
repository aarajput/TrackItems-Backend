const Model = require('./model');
const config = require('config');


class ItemModel extends Model {
    constructor() {
        super('items','I',);
    }


    getWithImage(){
        return this.rawTable
            .select('*')
            .select(this.knex
                .raw(`CONCAT('${config.domainName}','item_images/',${this.alias}.imageName) AS imageUrl`));
    }
}


module.exports = ItemModel;