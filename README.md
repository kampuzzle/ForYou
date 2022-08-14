# For You

> O produto proposto é um auxiliador de gestão financeira e controle de gastos. Com ele, é possível registrar receitas e gastos, os associando a uma categoria (salário, aluguel, viagem, etc), a uma data (podendo escolher datas retroativas), um valor e a uma descrição. Também é possível criar categorias novas para seus gastos e receitas. O produto então apresenta um balanço financeiro do mês escolhido, mostrando seu saldo inicial no mês, quanto foi gasto, quanto dinheiro você possui no momento e um gráfico de gastos indicando qual porcentagem foi gasta em cada categoria.

![](https://github.com/kampuzzle/PI/blob/master/exemploProjeto.gif)

## Execução

Criamos um docker para facilitar a execução do projeto. Para usar a aplicação, é preciso instalar o docker em sua máquina (https://www.docker.com/get-started/), clonar este repositório, navegar até a pasta ForYou/docker e rodar o comando para buildar e subir o container:

```sh
cd PI/ForYou/docker

docker-compose up --build
```

Após isso, basta acessar em seu browser a localhost na porta 80.

Para a API, igualmente automatizamos a inicialização com docker. Para subir o backend, basta navegar até a pasta PIBackend/docker-api e rodar o comando para buildar e subir o conainer:

```sh
cd PI/PIBackend/docker-api

docker-compose up --build
```

Após isso, a API já estará escutando na porta 8080, pronta para receber as requisições.

## Exemplo de utilização

Este vídeo demonstra como utilizar o sistema:
[![](https://img.youtube.com/vi/qCwCjdGsWWU/0.jpg)](https://youtu.be/qCwCjdGsWWU?t=62)

## Contribuindo

1. Faça um fork (<https://github.com/kampuzzle/PI/fork>)
2. Crie uma branch de contribuição (`git checkout -b feature/fooBar`)
3. Faça um commit (`git commit -am 'Adicionando fooBar'`)
4. Faça o push para a branch (`git push origin feature/fooBar`)
5. Crie um novo Pull Request
