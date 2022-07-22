const User = require('../models/User');

const fs = require("fs");

function leArq(){
    var usuarios = []

    let rawdata = fs.readFileSync('./data/usuarios.json'); //le o arquivo json
    let data = JSON.parse(rawdata); //faz o parse do arquivo json

    for (var i=0; i< data.length; i++){
        //verificar se ja existem usuários com o nome?
        usuarios.push(data[i])
    }

    return usuarios
}

function escreveArq(usuarios){
    const jsonString = JSON.stringify(usuarios)
    fs.writeFile('./data/usuarios.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
            return 1
        } else {
            console.log('Successfully wrote file')
            return 0
        }
    })
}

async function criaUsuario(req, res) {
    var usuarios = leArq()
    
    const cliente = new User(req.body.nomeDeUsuario,req.body.email,req.body.senha);
    usuarios.push(cliente)

    if (escreveArq(usuarios) == 0){
        res.send("ok")
    }
    res.send("erro")

}

async function fazLogin(req,res) {
    var usuarios = leArq();
    var login = 0

    for (const user of usuarios) {
        if( user.nomeDeUsuario === req.body.nomeDeUsuario) {

            if (user.senha === req.body.senha){
                return res.send("Ok")
            }
        }
    }
    res.send("Erro")

}

module.exports = {
    criaUsuario,
    fazLogin,
};