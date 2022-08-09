const User = require('../models/User');
const helper = require('../helper/fileHandling')

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

async function adicionaCategoria(req,res){
    var usuarios = helper.leArq()
    var teste = 0
    
    for (const user of usuarios) {
   
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if( req.body.tipo === "Receita"){

                for (const cat of user.categoriasReceita){
                    if (cat === req.body.categoria){
                        teste = 1 //verifica se a categoria já existe
                    }
                }

                if (teste == 0){
                    user.categoriasReceita.push(req.body.categoria)
                }
            }

            else if ( req.body.tipo === "Despesa"){

                for (const cat of user.categoriasDespesa){
                    if (cat === req.body.categoria){
                        teste = 1
                    }
                }

                if( teste == 0){
                    user.categoriasDespesa.push(req.body.categoria)
                }
            }

        }
        else{
            console.log("algo de errado")
        }
    }

    if (helper.escreveArq(usuarios) === 0){
        return res.send({'message': 'ok'})
    }
    res.send({'message': 'erro'})

}

module.exports = {
    criaUsuario,
    fazLogin,
    adicionaCategoria,
};

