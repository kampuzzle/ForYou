module.exports = class Gasto {

    constructor(descricao, data, valor, categoria){
        this.descricao = descricao;
        this.data = data;
        this.valor = valor;
        this.categoria = categoria;
        this.id = 0;
    }

    setId(id){
        this.id = id
    }
    
}