let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');
var pirateSpeak = require('pirate-speak');
let chat = require('../controllers/SalaController')

//lecturas de bases de datos debug runtime
router.get('/users', dashboardController.readAll);
router.post('/:id/delete', dashboardController.delete); //DELETE

router.get('/groups', dashboardController.groupsAll);

//creaciones de salas
router.get('/salaCrea/:id', dashboardController.loadNuevoHost);
router.get('/crearSala', dashboardController. nuevaSala);



//registrar sala
router.post('/unirseSala', dashboardController. registrarSala);

//procesos de "carga"
router.post('/salaCrea/backToHome',dashboardController.backToHome);
router.post('/salaCrea/backToHomeAbort',dashboardController.cancelarSala);
 //deshacer la creacion de sala, etc deshace las peticiones de creacion... cuando haya un delete de salas reciclarlo aqui

//otros
router.get('/dashboard', dashboardController.index);

//unirse a sala de juego
router.post('/chat',chat.index)
router.post('/translate-yarg', (req, res) => { 
        let str = req.body.texto; 
        console.log(str+" en ruta");
            let result = pirateSpeak.translate(str); 
            	res.send(result); }); 

module.exports = router;
