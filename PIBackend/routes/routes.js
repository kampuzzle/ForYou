const userController = require("../controllers/userController");
const gastoController = require("../controllers/gastoController")
const router = require("express").Router();

//rotas utilizando a controller userController
router.post('/cadastro',userController.criaUsuario)
router.post('/login',userController.fazLogin)
router.post('/adicionaCategoria', userController.adicionaCategoria)

//rotas utilizando a controller gastoController
router.post('/novaMovimentacao', gastoController.adicionaGasto)
router.put('/attMovimentacao',gastoController.atualizaGasto)
router.delete('/deleteMovimentacao',gastoController.deleteGasto)
router.get('/getCategoria/:User/:Tipo',gastoController.getCategorias)
router.get('/getMovimentacoes/:User/:Tipo/:Mes',gastoController.getGastos)
router.get('/getMovCateg/:User/:Tipo/:Mes/:Categoria',gastoController.getGastosPorCategoria)
router.get('/getSaldos/:User/:Mes',gastoController.getSaldos)
router.get('/getDespesas/:User/:Mes',gastoController.getDespesas)

module.exports = router
