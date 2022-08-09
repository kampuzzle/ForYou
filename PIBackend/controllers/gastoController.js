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

    const newGasto = new Gasto(req.body.descricao,req.body.data,req.body.valor,req.body.categoria)
    //ADICIONAR OU REMOVER O SALDO

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {
            console.log(req.body.nomeDeUsuario)
            if (req.body.tipo === "receita"){
                console.log(req.body.tipo)
                user.saldoAtual += (req.body).valor;

                //a id é um a mais do q a ultima id
                if ( (user.listaReceitas).length > 0){
                    console.log(user.saldoAtual);
                    id = (user.listaReceitas[(user.listaReceitas).length - 1]).id + 1;
                }
                
                (user.listaReceitas).push(newGasto);
                newGasto.setId(id);
                
            }
            else if (req.body.tipo === "despesa") {
                user.saldoAtual -= (req.body).valor;

                if ( (user.listaDespesas).length > 0){
                    id = (user.listaDespesas[(user.listaDespesas).length - 1]).id + 1;
                }
            
                (user.listaDespesas).push(newGasto);
                newGasto.setId(id);
            }
        }
    }
    console.log(newGasto)
    if (helper.escreveArq(usuarios) === 0){
        return res.send({'message': 'ok'});
    }
    res.send({'message':'erro'})
}

async function atualizaGasto(req, res){
    // var usuarios = helper.leArq()
    // //ATUALIZAR O SALDO

    // for (const user of usuarios) {
    //     if(user.nomeDeUsuario === req.body.nomeDeUsuario) {
    //         if (req.body.tipo === "Receita"){
                
    //             for ( const gasto of user.listaReceitas){
    //                 if ( req.body.id === gasto.id){
    //                     if (req.body.descricao != null){
    //                         gasto.descricao = req.body.descricao
    //                     }
    //                     if (req.body.categoria != null){
    //                         gasto.categoria = req.body.categoria
    //                     }
    //                     if (req.body.data != null){
    //                         //TESTAR TESTAR TESTAR
    //                         //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //                         gasto.setDate(req.body.data);
                            
    //                     }
    //                     if (req.body.valor != null){
    //                         user.saldoAtual += req.body.valor;
    //                         gasto.valor = req.body.valor
    //                     }
    //                 }
    //             }
    //         }

    //         else if(req.body.tipo === "Despesa"){
    //             for ( const gasto of user.listaDespesas){
    //                 if ( req.body.id === gasto.id){
    //                     if (req.body.descricao != null){
    //                         gasto.descricao = req.body.descricao
    //                     }
    //                     if (req.body.categoria != null){
    //                         gasto.categoria = req.body.categoria
    //                     }
    //                     if (req.body.data != null){
    //                         gasto.data = req.body.data
    //                     }
    //                     if (req.body.valor != null){
    //                         user.saldoAtual -= req.body.valor;
    //                         gasto.valor = req.body.valor
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // if (helper.escreveArq(usuarios) === 0){
    //     return res.send({'message': 'ok'})
    // }
    // res.send({'message': 'erro'})

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
                        return res.send({'message': 'ok'})
                        //return res.status(200);
                        break;
                    }
                    id += 1
                }
        
            }
            else if (req.body.tipo === "Despesa") {
                for ( const gasto of user.listaDespesas){
                    if ( req.body.id === gasto.id){
                        user.listaDespesas.splice(id,1);
                        helper.escreveArq(usuarios);
                        return res.send({'message': 'ok'})
                        //return res.status(200);
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

            if (req.params['Tipo'] === "receita"){
                console.log(JSON.stringify(user.categoriasReceita))
                return res.json(user.categoriasReceita)
                
            }
            else if (req.params['Tipo'] === "despesa") {
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

    console.log("get Gastoss")
    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {
            console.log("acha o usuario")
           
                for (const receita of user.listaReceitas){
                    console.log(user.listaReceitas, receita)
                    console.log(receita.mes, mes)
                    if (receita.mes === mes){
                        receita.tipo = "receita"
                        listaMovimentacoes.push(receita)
                    }

                }
                console.log(JSON.stringify(listaMovimentacoes))

                for (const gasto of user.listaDespesas){
                    if (gasto.mes === mes){
                        gasto.tipo = "despesa"
                        listaMovimentacoes.push(gasto)
                    }
                }
                console.log(JSON.stringify(listaMovimentacoes))
                return res.json(listaMovimentacoes)
            
        }
    }
}


async function getDespesas(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var listaMovimentacoes = []

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

                for (const gasto of user.listaDespesas){
                    if (gasto.mes === mes){
                        gasto.tipo = "despesa"
                        listaMovimentacoes.push(gasto)
                    }
                }
                console.log(JSON.stringify(listaMovimentacoes))
                return res.json(listaMovimentacoes)
            
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
            console.log("usuario ok")
            if (req.params['Tipo'] === "receita"){
                console.log("receita ok")
                for (const receita of user.listaReceitas){
                    if (receita.mes === mes){
                        console.log(receita.categoria, categoria)
                        if (receita.categoria === categoria){
                            listaMovimentacoesCateg.push(receita)
                        }
                    }
                }
                console.log(JSON.stringify(listaMovimentacoesCateg))
                return res.json(listaMovimentacoesCateg)

            }
            else if (req.params['Tipo'] === "despesa") {
               
                for (const gasto of user.listaDespesas){
                    if (gasto.mes === mes){
                        if (gasto.categoria === categoria){
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
    var mes = req.params['Mes']
    var saldoIni = 0; //quanto tinha no começo do mes
    var gastoAtual = 0; //quanto gastou no mes
    var saldoAtual = 0;

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {
            saldoAtual = user.saldoAtual;

            for (const receita of user.listaReceitas){
                if (receita.mes != mes){
                    saldoIni += receita.valor;
                }
            }
            for (const despesa of user.listaDespesas){
                if (despesa.mes != mes){
                    saldoIni -= despesa.valor;
                }
                else{
                    gastoAtual += despesa.valor;
                }
            }
        }
    }

    res.end(JSON.stringify({ saldoInicial: saldoIni, gastoMes: gastoAtual, saldoAtual: saldoAtual}));
}

module.exports = {
    adicionaGasto,
    atualizaGasto,
    deleteGasto,
    getCategorias,
    getGastos,
    getGastosPorCategoria,
    getSaldos,
    getDespesas,
};
