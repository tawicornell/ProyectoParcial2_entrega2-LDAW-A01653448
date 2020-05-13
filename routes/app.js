let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');

let chat = require('../controllers/SalaController')

//lecturas de bases de datos debug runtime
router.get('/users', dashboardController.readAll);
router.post('/:id/delete', dashboardController.delete); //DELETE

router.get('/groups', dashboardController.groupsAll);

//creaciones de salas
router.get('/salaCrea/:id', dashboardController.loadNuevoHost);
router.get('/crearSala', dashboardController. nuevaSala);

//unirse a sala de juego
router.get('/loadSala', dashboardController. entrarSala);

//registrar sala
router.post('/unirseSala', dashboardController. registrarSala);

//procesos de "carga"
router.post('/salaCrea/backToHome',dashboardController.backToHome);
router.post('/salaCrea/backToHomeAbort',dashboardController.cancelarSala);
 //deshacer la creacion de sala, etc deshace las peticiones de creacion... cuando haya un delete de salas reciclarlo aqui

//otros
router.get('/dashboard', dashboardController.index);

router.get('/chat',chat.index)

module.exports = router;
