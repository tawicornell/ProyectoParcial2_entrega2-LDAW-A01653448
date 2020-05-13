let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models/User');
let GroupModel = require('../models/Group');
let router = require('express').Router();

//login to app with privileges
exports.index = (req, res) => {
  let user = req.user;
//comporbacion de privilegios
if ( user.role == 'admin' ) {
  res.render('dashboard/indexAdm', {user: user});
}else{ 

  res.render('dashboard/index', {user: user});
  }
}

exports.entrarSala = (req, res) => {

  let user = req.user;
  let number = req.user.groupID;
  //console.log("2");
      GroupModel.findbyGroupID(number).then((a) =>  {
  
        var obj = JSON.parse(a.members); 
  //console.log("3");
          res.render('dashboard/salaJuego', {  user:user, groups:a, members:obj.members   });
        
        });
 


}

exports.groupsAll = (req, res) =>{

  //leer todos los grupos, ver el json
  GroupModel.readAll()
    .then((loquesea) => {
      //leer lo recibido en json
   res.json(loquesea); 
    });

}

exports.registrarSala = (req, res) =>{
  let user = req.user;
  //console.log(req.body.registrarSalaID);
  //token es el groupid o codigo
  let token = req.body.registrarSalaID;
  UserModel.updateSalasUser(user, token).then((result) => { 

    //reconstruir el json
    GroupModel.findbyGroupID(token).then((grupo) =>  {
    
      jsonObj = JSON.parse( grupo.members);
     jsonNew = reconstruirJSON(user.name, jsonObj);

     var counter = 1
     for (const i in jsonObj.members) {
    counter++;
     }
     console.log(counter);

    GroupModel.meterJSONdeMiembros(token, jsonNew).then((result2) =>{
      
      GroupModel.añadirContadorMiembros(token, counter).then((result4) =>{

        res.redirect('/app/dashboard');


      })
    });
  });
  });
}

function reconstruirJSON(cadena,jsonObj){
 //recibe un json obj parseado
 // obj del tipo { algo: [ 'etc', 'etc2' ] }
 let text = jsonObj;
 //y una cadena a concatenar al final del json
 let aniadido = cadena;
    var cadena = "";
    for (const i in text.members) {
 if (i == 0) {
  cadena = '"'+text.members[i]+'"';
 } else { 
      cadena = cadena + ',"'+text.members[i]+'"';
                  }
    }
    cadena = cadena + ',"'+aniadido+'"';
    text= '{"members":[' + cadena +  ']}';
    return text;
    //regresa un string json
}

exports.cancelarSala = (req, res) =>{
  let user = req.user;
  console.log("beep");
  //DELETE Y REFRESH...luego
  res.redirect('/app/dashboard');
}


exports.backToHome = (req, res) =>{
  let user = req.user;
  res.redirect('/app/dashboard');//verdadero redirect a home
//res.redirect('/');
}


exports.nuevaSala = (req, res) =>{
  let user = req.user;
  //generar el id random 6 digs
 var number = generarSalaID();
 //crear la sal en BD
  GroupModel.create(user, number)
    .then((result) => {
//ruta para params
 var ruta = 'app/../salaCrea/'+number;
// console.log(result); //IMPRIME UN [id]?
res.redirect(ruta);
    });   
}

//Asociar un host a esa sala... para privilegios, etc
exports.loadNuevoHost = (req, res) =>{

let user = req.user;
let groups = req.params.id;
let number = groups;
//ENCADENAMIENTO DE PROMESAS
//modelo . knexquery (parametros del knexquery).then((variable de la respuesta) => { algo cuando responda })
//update sala añade la sala al current session user,FALTA CONERTIR A JSON
  UserModel.updateSalasUser(user, groups).then((b) => {
  
    user.groupID = number;
  //   console.log(b); // que es este? TRUE FALSO

  
var text = '{"members":["' + user.name +  '"]}';

//update sala actualiza el json con la lista de miembros
    GroupModel.meterJSONdeMiembros(number, text).then((x) =>{
   //COSAS DE JSONs
      // Si el producto existe entonces muestra la vista products/show.hbs
      // con la información del producto
      /* JSON validos
      "employees":[
        {"firstName":"John", "lastName":"Doe"},
        {"firstName":"Anna", "lastName":"Smith"},
        {"firstName":"Peter", "lastName":"Jones"}
      ]
      armar JSON
     var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';  */
//convertir json a obj array
/*var obj = JSON.parse(text); 
*/
//var obj = JSON.parse(text); 

     
    GroupModel.findbyGroupID(number).then((a) =>  {

      var obj = JSON.parse(text);  //CONVERTIR JSON A ARRAY
 //     console.log(obj);  //ver obj de javascript
//      console.log(obj.members[0]); //acceder a un elemento array parseado
//      console.log(obj.members); //acceder al array parseado

        res.render('dashboard/salaCrea', {  user:user, groups:a, members:obj   });
      
      });
    });
  });
}

//funcion js
function generarSalaID(){
  var x = Math.floor(100000 + Math.random() * 900000);
  return x;
}

//leer todos los json de users para ponerlos en un hbs
exports.readAll = (req, res) => {
  let user = req.user;
  if ( user.role == 'admin' ) {
  
  UserModel.all()
    .then((data) => {
      let users = data;
      res.render('dashboard/users', { users: users });
    });
}else{ 
//Unathourized access even logged
  res.status(401).json({ msg: 'ERROR 403' });
  }
}

//Borrar users para debug
//recibe datos de ruta con app.js y aqui actua, esta funcion se usa en app.js
exports.delete = (req, res) => {
//url
  let id = req.params.id;
  //input
//usa el metodo de User.js que es el modelo, se le manda una variable y lo corre como funcion
UserModel.delete(id)
.then((data) => {
  //refrsh de pagina o volver a la anterior?
res.redirect('back');
});
}
