module.exports = class User {

    constructor(nomeDeUsuario, email, senha){
        this.nomeDeUsuario = nomeDeUsuario;
        this.email = email;
        this.senha = senha;
        this.listaDespesas = []
        this.listaReceitas = []
    }

    addCategoriaDespesa(categoria){
        listaDespesas.push(categoria)
    }

    addCategoriaReceita(categoria){
        listaReceitas.push(categoria)
    }
}