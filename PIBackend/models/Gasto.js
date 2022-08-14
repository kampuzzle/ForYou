//representa as despesas e receitas criadas

module.exports = class Gasto {

    constructor(descricao, data, valor, categoria){
        this.descricao = descricao;
        this.setDate(data)
        this.valor = valor;
        this.categoria = categoria;
        this.id = 0;
    }

    setId(id){
        this.id = id
    }

    setDate(data){
        var dataSplit = data.split("-");
        this.ano = dataSplit[0];
        this.mes = dataSplit[1];
        this.dia = dataSplit[2];
    }
    
}