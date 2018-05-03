const Model = require('./model');

class UserModel extends Model{
    constructor() {
        super('users','U');
    }

    async getUserWithToken(object) {
        return this.table
            .select(this.knex.raw("TO_BASE64(CONCAT(U.email,'||',U.token,'||',U.created_on)) AS authorization"))
            .where(object);
    }
}


module.exports = UserModel;

module.exports.toDBObject = input=>{
    const obj =  {};
    obj.full_name = input.fullName;
    obj.email = input.email;
    obj.password = input.password;
    return obj;
};