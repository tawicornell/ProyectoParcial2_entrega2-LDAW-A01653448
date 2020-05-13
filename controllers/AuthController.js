const { validationResult } = require('express-validator');
let userModel = require('../models/User');
let passport = require('passport');

exports.login = (req, res) => {
  let authError = req.query.authError == 1 ? 'Invalid register data' : null;

  res.render('auth/login', {
     layout: 'auth', authError: authError
     });

}

exports.register = (req, res) => {
  res.render('auth/register', {
    layout: 'auth',
    errors: req.flash('errors')
  });
}



//responde the user db
exports.users = (req, res) => {
  res.render('auth/users',  {
    layout: 'auth',
    errors: req.flash('errors')
  });
}


exports.store = (req, res) => {
  // Identifica si hubieron errores en el request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('back');
  }
  
  userModel.create({ name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password, groupID: 0 })
    .then((data) => {
      return res.redirect('/login');
    })
    .catch((error) => console.log(error));
}

