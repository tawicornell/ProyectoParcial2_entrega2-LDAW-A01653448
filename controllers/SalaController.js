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

    res.render('sala/chat');
    /*
      socket.on('connection', (socket) => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', (data) => {
          console.log(data);
        });
      });
      */

}




function render (data) {

    var html = data.map(function(elem, index) {
      return(`<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
              </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
  }
  
  function addMessage(e) {
  
    var message = {
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);
    return false;
  }