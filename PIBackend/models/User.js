module.exports = class User {

    constructor(nomeDeUsuario, email, senha){
        this.nomeDeUsuario = nomeDeUsuario;
        this.email = email;
        this.senha = senha;
        this.categoriasReceita = ["Salário", "Rendimento", "Extra"] 
        this.categoriasDespesas = ["Casa", "Restaurante", "Entretenimento", "Roupas", "Mercado", "Viagem", "Transporte"]
        this.listaDespesas = []
        this.listaReceitas = []
        this.saldoAtual = 0.0
    }

}