
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      //migracion y poblacion de la base de datos
      table.string('role', 255).notNullable();
      table.string('password', 512).notNullable();
      table.timestamps(true, true);
      //-----------------------------------------
      table.string('groupID',255);
     // table.specificType('groupID', 'integer ARRAY');
    })

    .createTable('groups', (table) => {
      table.increments('id');
      table.string('memberNum',255);
      table.string('groupID',255);
     table.text('members');//json
      table.string('host',255);
      table.string('gameID',255)
      //objetos json a json stringfy
//json.stinrngify
      //table.text('algo')

      //leer y se pasa a jason o javascript con parse
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
