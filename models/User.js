const knex = require('../database/connection');
const bcrypt = require('bcrypt')


//DEVOLUCIONES DE KNEX
//create, id
//delte, update, boolean
//query busqueda, json

exports.find = (id) => {
  return knex
    .select('*')
    .from('users')
    .where('id', id)
    .first();
}


exports.updateSalasUser = (user, number) => {

  return knex('users')
    .where('id', user.id)
    .update({groupID: number});
}


exports.findByEmail = (email) => {
  return knex
    .select('*')
    .from('users')
    .where('email', email)
    .first();
}


exports.create = (user) => {
  // Obtiene la contraseña definida por el usuario
  let pass = user.password;
  // Encripta la contraseña
  pass = bcrypt.hashSync(pass, 10);
  return knex('users')
    .insert({ name: user.name, email: user.email, role: user.role, password: pass, groupID: 0 }).then();
}

// Crea un nuevo Producto (pero no lo almacena en la base)
exports.factory = (name, email, role) => {
  return {
    name: name,
    email: email,
    role: role
  }
}

// Obtiene todos los productos en la base
exports.all = () => {
  return knex
    .from('users')
    .select('*');
}


exports.delete = (id) => {
 
  return knex.from('users').where('id',id).del();
}