const knex = require('../database/connection');
const bcrypt = require('bcrypt')


//DEVOLUCIONES DE KNEX
//create, id
//delte, update, boolean
//query busqueda, json

exports.readAll = () => {
  return knex
    .from('groups')
    .select('*');
}


exports.findByHost = (user) => {
  return knex
    .select('*')
    .from('groups')
    .where('host', user.name).first();
}


exports.create = (user, number) => {
 // console.log(user);
  // Obtiene la contraseña definida por el usuario
return knex('groups')
    .insert({ memberNum: 1, groupID: number, host: user.name, gameID: number });


}


exports.meterJSONdeMiembros = (number, text) => {

  return knex('groups')
    .where('groupID', number)
    .update({members: text});
}


// Crea un nuevo Producto (pero no lo almacena en la base)
exports.factory = (groupID, host, memberNum) => {
  return {
    groupID: groupID,
    host: host,
    memberNum: memberNum
  }
}

exports.añadirContadorMiembros = (groupID, number) => {
  return knex('groups')
  .where('groupID', groupID)
  .update({memberNum: number});
}



exports.findbyGroupID = (id) => {
  return knex
    .select('*')
    .from('groups')
    .where('groupID', id)
    .first();
}
