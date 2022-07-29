const User = require('../models/User');
const Gasto = require('../models/Gasto');
const helper = require('../helper/fileHandling');

async function adicionaGasto(req,res){
    var usuarios = helper.leArq()

    const newGasto = new Gasto(req.body.descricao,req.body.data,req.body.valor,req.body.categoria)

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                //a id é um a mais do q a ultima id
                let id = (user.listaReceitas[(user.listaReceitas).length - 1]).id + 1;
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

}

async function deleteGasto(req, res){
    var usuarios = helper.leArq();
    var index = 0;

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (req.body.tipo === "Receita"){
                for (const rec of user.listaReceitas){
                    if (req.body.id == rec.id){
                 
                        (user.listaReceitas).splice(index,1);
                    }
                    index += 1;
                }
                
                
            }
            else if (req.body.tipo === "Despesa") {
                for (const rec of user.listaDespesas){
                    if (req.body.id == rec.id){
                        (user.listaDespesas).splice(index,1);
                    }
                    index += 1;
                }
                
            }
        }
    }

    if (helper.escreveArq(usuarios) === 0){
        return res.send("ok")
    }
    res.send("erro")
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

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.params['User']) {

            if (req.params['Tipo'] === "Receita"){
                console.log(JSON.stringify(user.listaReceitas))
                return res.json(user.listaReceitas)

                
            }
            else if (req.params['Tipo'] === "Despesa") {
                console.log(JSON.stringify(user.listaDespesas))
                return res.json(user.listaDespesas)
            }
        }
    }
}




module.exports = {
    adicionaGasto,
    atualizaGasto,
    deleteGasto,
    getCategorias,
    getGastos,
};
