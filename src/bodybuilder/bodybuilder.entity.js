class BodyBuilder{

    constructor(nome, cpf, peso, altura, dataNascimento, sapato, gym, style){
        this.nome = nome
        this.cpf = cpf
        this.peso = peso
        this.altura = altura
        this.dataNascimento = dataNascimento
        this.sapato = sapato
        
        this.gym = gym // associoação com a classe Gym
        this.style = style

    }
}
module.exports = BodyBuilder