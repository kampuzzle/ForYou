const User = require('../models/User');
const helper = require('../helper/fileHandling')

//adiciona um usuário no json de usuários
async function criaUsuario(req, res) {
    var usuarios = helper.leArq()

    if (req.body.password === req.body.confirmPassword) {
        const cliente = new User(req.body.username,req.body.email,req.body.password);
        usuarios.push(cliente)

        if (helper.escreveArq(usuarios) === 0){
            return res.send({'message': 'ok'})
        }
        return res.send({'message': 'erro'})
    }
    
    return res.send({'message':'As senhas não coincidem'})

}

//retorna ok caso o login tenha sucesso
async function fazLogin(req,res) {
    var usuarios = helper.leArq();

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.username) {

            if (user.senha === req.body.password){
                return res.send({'message': 'ok'})
                
            }
        }
    }
    res.send({'message': 'Usuário não cadastrado no sistema'})

}

module.exports = {
    criaUsuario,
    fazLogin,
};

