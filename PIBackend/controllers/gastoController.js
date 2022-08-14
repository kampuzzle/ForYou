const User = require('../models/User');
const Gasto = require('../models/Gasto');
const DespesaGrafico = require('../models/DespesaGrafico')
const helper = require('../helper/fileHandling');

async function adicionaGasto(req,res){
    var usuarios = helper.leArq()
    let id = 0

    //cria uma nova movimentação do tipo receita ou despesa
    const newGasto = new Gasto(req.body.descricao,req.body.data,req.body.valor,req.body.categoria)

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {  //identifica o usuário
            if (req.body.tipo === "receita"){
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

    if (helper.escreveArq(usuarios) === 0){
        return res.send({'message': 'ok'});
    }
    res.send({'message':'erro'})
}

//deleta a movimentação pedida pela id
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
                    }
                    id += 1
                }
        
            }
            else if (req.body.tipo === "Despesa") {
                for ( const gasto of user.listaDespesas){
                    if ( req.body.id === gasto.id){
                        user.listaDespesas.splice(id,1);
                        helper.escreveArq(usuarios);
                        return res.send({'message': 'ok'});
                    }
                    id +=1
                }
            }
        }
    }
}

//retorna a lista de despesas e receitas do usuário passado
async function getGastos(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var listaMovimentacoes = []

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {
           
                for (const receita of user.listaReceitas){
                    if (receita.mes === mes){
                        receita.tipo = "receita"
                        listaMovimentacoes.push(receita)
                    }

                }

                for (const gasto of user.listaDespesas){
                    if (gasto.mes === mes){
                        gasto.tipo = "despesa"
                        listaMovimentacoes.push(gasto)
                    }
                }

                return res.json(listaMovimentacoes)
            
        }
    }
}

//retorna a lista de movimentações de uma categoria específica
async function getGastosPorCategoria(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var categoria = req.params['Categoria']
    var listaMovimentacoesCateg = []

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {
      
            if (req.params['Tipo'] === "receita"){
         
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
                        console.log(categoria, gasto.categoria, gasto)

                        if (gasto.categoria.replaceAll(/\s/g,'') === categoria.replaceAll(/\s/g,'')){
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

//retorna os valores dos saldos do usuário
async function getSaldos(req,res){
    var usuarios = helper.leArq();
    var mes = req.params['Mes']
    var saldoIni = 0; //quanto tinha no começo do mes
    var gastoAtual = 0; //quanto gastou no mes
    var saldoAtual = 0;

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {
            //saldo atual
            for (const despesa of user.listaDespesas){
                if (despesa.mes <= mes){
                    saldoAtual -= despesa.valor;
                }
            }
            for (const rec of user.listaReceitas){
                if (rec.mes <= mes) {
                    saldoAtual += rec.valor;
                }
            }          

            for (const despesa of user.listaDespesas){
                if (despesa.mes != mes){
                }
                else{
                    gastoAtual += despesa.valor;
                    gastoAtual = Math.round((gastoAtual + Number.EPSILON) * 100) / 100
                }
            }
        }
    }

    res.end(JSON.stringify({ saldoInicial: saldoIni, gastoMes: gastoAtual, saldoAtual: saldoAtual}));
}

module.exports = {
    adicionaGasto,
    deleteGasto,
    getGastos,
    getGastosPorCategoria,
    getSaldos,
};
