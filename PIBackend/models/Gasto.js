module.exports = class Gasto {

    constructor(descricao, data, valor, categoria){
        this.descricao = descricao
        this.data = data //FAZER TUDO JUNTO OU SEPARADO, O QUE EU IMAGINO SER MAIS FACIL
        this.valor = valor
        this.categoria = categoria
        this.id = 0
    }

    setId(id){
        this.id = id
    }
    
}