const User = require('../models/User');
const Gasto = require('../models/Gasto');
const helper = require('../helper/fileHandling');

/*
var month = (newGasto.data).getMonth() + 1; //months from 1-12
var day = (newGasto.data).getDate();
var year = (newGasto.data).getFullYear();
*/

async function adicionaGasto(req,res){
    var usuarios = helper.leArq()
    let id = 0

    const newGasto = new Gasto(req.body.descricao,req.body.data * 1000,req.body.valor,req.body.categoria)
    //ADICIONAR OU REMOVER O SALDO

    console.log(newGasto.ano, newGasto.mes, newGasto.dia)

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                //a id é um a mais do q a ultima id

                if ( (user.listaReceitas).length > 0){
                    console.log("ok")
                    id = (user.listaReceitas[(user.listaReceitas).length - 1]).id + 1;
                }
                
                (user.listaReceitas).push(newGasto);
                newGasto.setId(id);
                
            }
            else if (req.body.tipo === "Despesa") {
                let id = (user.listaDespesas[(user.listaDespesas).length - 1]).id + 1;
                (user.listaDespesas).push(newGasto);
                newGasto.setId(id);
            }
        }
    }
    console.log(newGasto)
    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")
}

async function atualizaGasto(req, res){
    var usuarios = helper.leArq()
    //ATUALIZAR O SALDO

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

async function deleteGasto(req, res){
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

async function getCategorias(req, res){
    var usuarios = helper.leArq();

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

            if (req.params['Tipo'] === "Receita"){
                console.log(JSON.stringify(user.categoriasReceita))
                return res.json(user.categoriasReceita)
                
            }
            else if (req.params['Tipo'] === "Despesa") {
                console.log(JSON.stringify(user.categoriasDespesa))
                return res.json(user.categoriasDespesa)
            }
        }
    }
}


async function getGastos(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var listaMovimentacoes = []

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

            if (req.params['Tipo'] === "Receita"){

                for (const receita of user.listaReceitas){
                    if (receita.mes == mes){
                        listaMovimentacoes.push(receita)
                    }

                }
                console.log(JSON.stringify(listaMovimentacoes))
                return res.json(listaMovimentacoes)

            }
            else if (req.params['Tipo'] === "Despesa") {
               
                for (const gasto of user.listaDespesas){
                    if (gasto.mes == mes){
                        listaMovimentacoes.push(gasto)
                    }
                }
                console.log(JSON.stringify(listaMovimentacoes))
                return res.json(listaMovimentacoes)
            }
        }
    }
}


async function getGastosPorCategoria(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var categoria = req.params['Categoria']
    var listaMovimentacoesCateg = []

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

            if (req.params['Tipo'] === "Receita"){

                for (const receita of user.listaReceitas){
                    if (receita.mes == mes){
                        if (receita.categoria === categoria){
                            listaMovimentacoesCateg.push(receita)
                        }
                    }
                }
                console.log(JSON.stringify(listaMovimentacoesCateg))
                return res.json(listaMovimentacoesCateg)

            }
            else if (req.params['Tipo'] === "Despesa") {
               
                for (const gasto of user.listaDespesas){
                    if (gasto.mes == mes){
                        if (receita.categoria === categoria){
                            listaMovimentacoesCateg.push(gasto)
                        }
                    }
                }
                console.log(JSON.stringify(listaMovimentacoesCateg))
                return res.json(listaMovimentacoesCateg)
            }
        }
    }
}

async function getSaldos(req,res){
    var usuarios = helper.leArq();
    var saldoInicial = 0;
    var saldoAtual = 0;
    var gastoAtual = 0;

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

            
        }
    }
}


module.exports = {
    adicionaGasto,
    atualizaGasto,
    deleteGasto,
    getCategorias,
    getGastos,
    getGastosPorCategoria,
};
