class Model {
    constructor(tableName,alias) {
        this.alias = alias;
        this.tableName = tableName;
        this.knex = require('./../utils/knex-init');
        let tableObj = {};
        tableObj[alias] = tableName;

        this.rawTable = this.knex(tableObj);
    }

    async save(object) {
        return this.knex(this.tableName).insert(object);
    }

    async delete(object) {
        return this.knex(this.tableName).delete(object);
    }

    async get(object={},offset=0,limit=10) {
        return this.rawTable.select('*').where(object).offset(offset).limit(limit);
    }
}

module.exports = Model;


