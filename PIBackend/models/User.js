module.exports = class User {

    constructor(nomeDeUsuario, email, senha){
        this.nomeDeUsuario = nomeDeUsuario;
        this.email = email;
        this.senha = senha;
        this.categoriasReceita = ["Salário", "Rendimento", "Mesada"] 
        this.categoriasDespesas = ["Alimentação","Lazer","Saúde","Transporte","Educação","Moradia","Outros"]
        this.listaDespesas = []
        this.listaReceitas = []
        this.saldoAtual = 0.0
    }

}