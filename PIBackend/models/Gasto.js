module.exports = class Gasto {

    constructor(descricao, ano,mes,dia, valor, categoria){
        this.descricao = descricao
        this.data = new Date(ano, mes, dia); //FAZER TUDO JUNTO OU SEPARADO, O QUE EU IMAGINO SER MAIS FACIL
        this.valor = valor
        this.categoria = categoria
        this.id = 0
    }

    setId(id){
        this.id = id
    }
    
}