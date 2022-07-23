const fs = require("fs");

exports.leArq = function(){
    var usuarios = []

    let rawdata = fs.readFileSync('./data/usuarios.json'); //le o arquivo json
    let data = JSON.parse(rawdata); //faz o parse do arquivo json

    for (var i=0; i< data.length; i++){
        //verificar se ja existem usuários com o nome?
        usuarios.push(data[i])
    }

    return usuarios
}

exports.escreveArq = function(usuarios){
    var teste = 0
    const jsonString = JSON.stringify(usuarios)
    fs.writeFile('./data/usuarios.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
            teste = 1
        } else {
            console.log('Successfully wrote file')
            
        }
    })

    return teste
}