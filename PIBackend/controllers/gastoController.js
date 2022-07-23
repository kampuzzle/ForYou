const User = require('../models/User');
const Gasto = require('../models/Gasto');
const helper = require('../helper/fileHandling');

async function adicionaGasto(req,res){
    var usuarios = helper.leArq()

    const newGasto = new Gasto(req.body.descricao,req.body.data,req.body.valor,req.body.categoria)

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                (user.listaReceitas).push(newGasto);
                
            }
            else if (req.body.tipo === "Despesa") {
                (user.listaDespesas).push(newGasto)
            }
        }
    }

    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")
}

async function atualizaGasto(req, res){

}

async function deleteGasto(req, res){
    
}

async function getCategoria(req, res){
    
}


module.exports = {
    adicionaGasto,
    atualizaGasto,
    deleteGasto,
    getCategoria,
};
