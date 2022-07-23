const User = require('../models/User');
const helper = require('../helper/fileHandling')

async function criaUsuario(req, res) {
    var usuarios = helper.leArq()
    
    const cliente = new User(req.body.nomeDeUsuario,req.body.email,req.body.senha);
    usuarios.push(cliente)

    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")

}

async function fazLogin(req,res) {
    var usuarios = helper.leArq();

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (user.senha === req.body.senha){
                return res.send("Ok")
            }
        }
    }
    res.send("Erro")

}

async function mudaSenha(req,res) {
    var usuarios = helper.leArq()

    for (const user of usuarios) {
        if ( user.nomeDeUsuario === req.body.nomeDeUsuario) {
            user.senha = req.body.senha
        }
    }

    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")
}

async function adicionaCategoria(req,res){
    var usuarios = helper.leArq()
    var teste = 0
    
    for (const user of usuarios) {
        console.log(user.nomeDeUsuario)
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {
            console.log(user.categoriasReceita)

            if( req.body.tipo === "Receita"){

                for (const cat of user.categoriasReceita){
                    if (cat === req.body.categoria){
                        teste = 1
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
        return res.send("okk")
    }
    res.send("erro")

}

module.exports = {
    criaUsuario,
    fazLogin,
    mudaSenha,
    adicionaCategoria,
};

