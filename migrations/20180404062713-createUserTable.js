'use strict';

let dbm;
let type;
let seed;

exports.setup = (options, seedLink)=>{
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = db => {
  return db.createTable('items',{
      id:{type:'bigint', primaryKey:true, autoIncrement:true,notNull:true},
      name:{type:'varchar',length:100,notNull:true},
      description:{type:'varchar',length:500,notNull:true},
      imagePath:{type:'varchar',length:200,notNull:true},
      location:{type:'varchar',length:200,notNull:true},
      cost:{type:'varchar',length:200,notNull:true},
      updated_on:{type:'datetime',defaultValue:'CURRENT_TIMESTAMP',notNull:true,onUpdate:true},
      created_on:{type:'datetime',defaultValue:'CURRENT_TIMESTAMP',notNull:true}
  }).then(()=> {
      return db.runSql('ALTER TABLE `items` CHANGE `updated_on` `updated_on` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;');
  });
};

exports.down = db => {
  return db.dropTable('items');
};

exports._meta = {
  "version": 1
};
