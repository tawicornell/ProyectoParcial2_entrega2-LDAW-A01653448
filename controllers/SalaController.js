let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models/User');
let GroupModel = require('../models/Group');
let router = require('express').Router();


 





const app = require('express')();
const server = require('http').Server(app);
//const io = require('socket.io')(server);

server.listen(80);

let io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', { 'forceNew': true });


//login to app with privileges
exports.index = (req, res) => {
    console.log("desde el export del router");

    
  let user = req.user;
  console.log(req.user);



        let number = req.user.groupID;
        //console.log("2");
            GroupModel.findbyGroupID(number).then((a) =>  {
        
              var obj = JSON.parse(a.members); 
        //console.log("3");
               res.render('sala/chat', {  user:user, groups:a, members:obj.members   });
              
              });
       
      
      

}




