const fs = require("fs");

//funcao para ler o arquivo data/usuarios.json e retornar um objeto com todas as informacoes
exports.leArq = function(){
    var usuarios = []

    let rawdata = fs.readFileSync('./data/usuarios.json'); //le o arquivo json
    let data = JSON.parse(rawdata); //faz o parse do arquivo json

    for (var i=0; i< data.length; i++){
        usuarios.push(data[i])
    }

    return usuarios
}

//funcao para atualizar o arquivo data/usuarios.json, salvando as mudanças feitas pelo usuário
exports.escreveArq = function(usuarios){
    var teste = 0 //retorna se conseguiu escrever no arquivo ou não
    
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