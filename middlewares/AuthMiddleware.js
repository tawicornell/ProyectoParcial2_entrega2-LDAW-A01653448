exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
   // res.status(401).json({ msg: 'Unathorized access' });
   //redirecciond e ivitados no identificados
    res.redirect('/register');
  
  }
}
