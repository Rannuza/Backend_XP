# Boas vindas ao repositório do projeto Backend_XP

Backend_XP é um projeto de uma Api de Backend para um aplicativo de investimentos, desenvolvida utilizando Node.js, Sequelize e Mysql. 

## Descrição

A Api gerência a tabela de clientes, a tabela de ativos (Ações) e uma tabela de relação entre essas duas entidades. Através de rotas de investimentos, conta e ativos a Api Backend_XP possibilita a realização de operações de compra e venda de ativos e deposito e saque de investimentos, além do resgate de informaçẽs dos ativos disponíveis para compra, dos ativos disponíveis na carteira dos usuários e do saldo dos usuários. 

## Instalação

```bash
git clone git@github.com:Rannuza/Backend_XP.git
cd Backend_XP
```
## Compilar e executar

```bash
docker-compose up -d
docker exec -it backend bash
npm install
```
**Utilizar os comandos abaixo respectivamente para iniciar o node ou o nodemon.**

```bash
npm run start

npm run dev
```

## Estrutura da aplicação

### Rota /investimentos

Essa rota possui dois endpoits do tipo POST /comprar e /vender.

### POST/investimentos/comprar:

- recebe a seguinte estrutura: 

```bash
{
  "codCliente": integer,
  "codAtivo": integer,
  "qtdeAtivo": integer,
}
```
**Em caso de operação realizada com sucesso**

- realiza as seguintes alterações no banco de dados:

1. Subtrai do saldo do usuário o valor gasto para compra das ações levando em consideração 2 fatores: o valor unitário da ação e a quantidade de ações compradas;
2. Subitrai da quantidade de Ativos disponíveis para compra na tabela de ativos a quantidade comprada pelo usuário;
3. Aumenta a quantidade de Ativos deste tipo pertencentes ao usuário na tabela de AtivosPorUsuário, caso o mesmo já possua ações iguais, ou cria uma nova linha na tabela de relação salvando as informações recebidas.

- devolve as seguintes informações:

1. Status HTTP 201;
2. Dados recebidos na requisição;

**Foram feitas as seguintes validações:**

- Se todos os campos da requisição foram preenchidos:

Caso falte algum terá o seguinte retorno:

```bash
{
    "message": "Algum campo obrigatório está faltando"
}
```
**Status HTTP 400**

- Se a qtdeAtivo for <= 0 terá o seguinte retorno:

```bash
{
    "message": "A quantidade miníma para compra é 1"
}
```
**Status HTTP 400**

- Se o valor total da compra for maior do que o usuário possui de saldo:

```bash
{
    "message": "Saldo insuficiente para concluir a compra"
}
```
**Status HTTP 409**
