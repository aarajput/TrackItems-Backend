const columns = ['U.id','U.full_name AS fullName','U.email','U.updated_on AS updatedOn', 'U.created_on AS createdOn'];

class Model {
    constructor(tableName,alias) {
        this.alias = alias;
        this.tableName = tableName;
        this.knex = require('./../utils/knex-init');
        let tableObj = {};
        tableObj[alias] = tableName;
        this.table = this.knex(tableObj).column(columns);
    }

    async save(object) {
        return this.knex(this.tableName).insert(object);
    }

    async get(object) {
        return this.table.select().where(object);
    }

}

module.exports = Model;

