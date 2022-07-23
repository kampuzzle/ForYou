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
router.put('/mudaSenha',userController.mudaSenha)
router.post('/adicionaCategoria', userController.adicionaCategoria)
router.post('/novoGasto', gastoController.adicionaGasto)
module.exports = router