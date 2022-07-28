const User = require('../models/User');
const Gasto = require('../models/Gasto');
const helper = require('../helper/fileHandling');

async function adicionaMovimentacao(req,res){
    var usuarios = helper.leArq()

    const newGasto = new Gasto(req.body.descricao,req.body.data,req.body.valor,req.body.categoria)

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                newGasto.setId((user.listaReceitas).length);
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

async function atualizaMovimentacao(req, res){
    var usuarios = helper.leArq()

    for (const user of usuarios) {
        if(user.nomeDeUsuario === req.body.nomeDeUsuario) {
            if (req.body.tipo === "Receita"){
                
                for ( const gasto of user.listaReceitas){
                    if ( req.body.id === gasto.id){
                        if (req.body.descricao != null){
                            gasto.descricao = req.body.descricao
                        }
                        if (req.body.categoria != null){
                            gasto.categoria = req.body.categoria
                        }
                        if (req.body.data != null){
                            gasto.data = req.body.data
                        }
                        if (req.body.valor != null){
                            gasto.valor = req.body.valor
                        }
                    }
                }
            }

            else if(req.body.tipo === "Despesa"){
                for ( const gasto of user.listaDespesas){
                    if ( req.body.id === gasto.id){
                        if (req.body.descricao != null){
                            gasto.descricao = req.body.descricao
                        }
                        if (req.body.categoria != null){
                            gasto.categoria = req.body.categoria
                        }
                        if (req.body.data != null){
                            gasto.data = req.body.data
                        }
                        if (req.body.valor != null){
                            gasto.valor = req.body.valor
                        }
                    }
                }
            }
        }
    }

    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")

}

async function deleteMovimentacao(req, res){
    var usuarios = helper.leArq()
    var id = 0

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                for ( const gasto of user.listaReceitas){
                    if ( req.body.id === gasto.id){
                        (user.listaReceitas).splice(id,1);
                        helper.escreveArq(usuarios);
                        res.status(200);
                        break;
                    }
                    id += 1
                }
        
            }
            else if (req.body.tipo === "Despesa") {
                for ( const gasto of user.listaDespesas){
                    if ( req.body.id === gasto.id){
                        user.listaDespesas.splice(id);
                        helper.escreveArq(usuarios);
                        res.status(200);
                        break;
                    }
                    id +=1
                }
            }
        }
    }
}

async function getExtratoMes(req,res){
    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                for (const gasto of user.listaReceitas){
                    
                }
        
            }
            else if (req.body.tipo === "Despesa") {
                for ( const gasto of user.listaDespesas){
                    if ( req.body.id === gasto.id){
                        
                        helper.escreveArq(usuarios);
                        res.status(200);
                        break;
                    }
                    id +=1
                }
            }
        }
    }
}

async function getCategoriaMes(req, res){
    
}


module.exports = {
    adicionaMovimentacao,
    atualizaMovimentacao,
    deleteMovimentacao,
    getExtratoMes,
    getCategoriaMes,
};
