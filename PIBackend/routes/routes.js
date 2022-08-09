const userController = require("../controllers/userController");
const gastoController = require("../controllers/gastoController")
const router = require("express").Router();

// essa é a rota para a página princial, quando se abre o site normalmente
router.get('/', (req, res) => {
    res.json({ "message": "Esse é o endereço padrão" });
})

//Exemplo de rota para uma página específica do site

router.get('/home', (req, res) => {
    res.json({ "message": "Essa é a home" });
})

// Aqui estabelece a rota que vai executar o comando do controller exemploController

router.post('/cadastro',userController.criaUsuario)
router.post('/login',userController.fazLogin)
router.post('/adicionaCategoria', userController.adicionaCategoria)

router.post('/novaMovimentacao', gastoController.adicionaGasto)
router.put('/attMovimentacao',gastoController.atualizaGasto)
router.delete('/deleteMovimentacao',gastoController.deleteGasto)
router.get('/getCategoria/:User/:Tipo',gastoController.getCategorias)
router.get('/getMovimentacoes/:User/:Tipo/:Mes',gastoController.getGastos)
router.get('/getMovCateg/:User/:Tipo/:Mes/:Categoria',gastoController.getGastosPorCategoria)
router.get('/getSaldos/:User/:Mes',gastoController.getSaldos)
router.get('/getGastos/:User/:Tipo/:Mes',gastoController.getDespesas)

module.exports = router
