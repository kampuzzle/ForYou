# For You

> O produto proposto é um auxiliador de gestão financeira e controle de gastos. Com ele, é possível registrar receitas e gastos, os associando a uma categoria (salário, aluguel, viagem, etc), a uma data (podendo escolher datas retroativas), uma entidade financeira (por exemplo em qual banco você recebeu uma receita, ou de onde gastou) e a uma descrição. Também é possível criar categorias novas para seus gastos e receitas. O produto então apresenta um balanço financeiro do mês escolhido, mostrando seu saldo inicial no mês, quanto foi gasto, quanto dinheiro você possui no momento e um gráfico de gastos indicando qual porcentagem foi gasta em cada categoria.

## Execução

Criamos um docker para facilitar a execução do projeto. Para usar a aplicação, é preciso instalar o docker em sua máquina (https://www.docker.com/get-started/), clonar este repositório, navegar até a pasta docker e rodar o comando para buildar e subir o container:

```sh
cd PI/ForYou/docker

docker-compose up --build
```

Após isso, basta acessar em seu browser a localhost na porta 80.


