module.exports = class Gasto {

    constructor(descricao, data, valor, categoria){
        this.descricao = descricao;
        let dataCompleta = new Date(data);
        this.ano = dataCompleta.getFullYear();
        this.mes = dataCompleta.getMonth() + 1;
        this.dia = dataCompleta.getDate();
        this.valor = valor;
        this.categoria = categoria;
        this.id = 0;
    }

    setId(id){
        this.id = id
    }
    
}