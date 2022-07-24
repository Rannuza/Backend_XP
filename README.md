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

## 1. Rota /investimentos

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

```bash
{
  "codCliente": integer,
  "codAtivo": integer,
  "qtdeAtivo": integer,
}
```
**Status HTTP 201**

**Foram feitas as seguintes validações:**

- Se algum campo da solicitação não foi preenchido:

```bash
{
    "message": "Algum campo obrigatório está faltando"
}
```
**Status HTTP 400**

- Se a qtdeAtivo for <= 0 terá o seguinte retorno:

```bash
{
    "message": "A quantidade miníma é 1"
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

### POST/investimentos/vender:

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

1. Soma ao saldo do usuário o valor ganho com a venda das ações levando em consideração 2 fatores: o valor unitário da ação e a quantidade de ações vendidas;
2. Soma a quantidade de Ativos disponíveis para compra na tabela de ativos a quantidade vendida pelo usuário;
3. Subtrai da tabela de AtivosPorUsuário a quantidade de ações vendida pelo usuário;

- devolve as seguintes informações:

```bash
{
  "codCliente": integer,
  "codAtivo": integer,
  "qtdeAtivo": integer,
}
```
**Status HTTP 201**

**Foram feitas as seguintes validações:**

- Se algum campo da solicitação não foi preenchido:

```bash
{
    "message": "Algum campo obrigatório está faltando"
}
```
**Status HTTP 400**

- Se a qtdeAtivo for <= 0 terá o seguinte retorno:

```bash
{
    "message": "A quantidade miníma é 1"
}
```
**Status HTTP 400**

- Se a quantidade informada for maior do que a que o usuário possui na carteira:

```bash
{
    "message": "Quantidade informada excede a quantidade disponível para venda"
}
```
**Status HTTP 409**

## 2. Rota /ativos

Essa rota possui dois endpoits do tipo GET /cliente/:codCliente e /:codAtivo.

### GET/ativos/cliente/:codCliente:

**Em caso de operação realizada com sucesso**

- Devolve as seguintes informações do banco de dados:

As informações de todas as ações que o cliente possui em sua carteira acrescidas do valor unitátio de cada ação.

```bash
[
    {
        "codCliente": 1,
        "codAtivo": 1,
        "QtdeAtivo": 1,
        "valor": "350"
    },
    {
        "codCliente": 1,
        "codAtivo": 2,
        "QtdeAtivo": 3,
        "valor": "50"
    }
]
```
**Status HTTP 200**

**Foram feitas as seguintes validações:**

- Se o usuário não possuir ações ou não existir:

```bash
{
    "message": "Usuário não localizado"
}
```
**Status HTTP 404**

### GET/ativos/:codAtivo:

**Em caso de operação realizada com sucesso**

- Devolve as informações do ativo localizado:

```bash
{
    "codAtivo": 1,
    "name": "Ativo1",
    "qtdeAtivo": 101,
    "valor": "350"
}
```
**Status HTTP 200**

**Foram feitas as seguintes validações:**

- Se o ativo não existir:

```bash
{
    "message": "Ativo não localizado"
}
```
**Status HTTP 404**

## 3. Rota /conta

Essa rota possui dois endpoints de POST /deposito e /saque e um endpoint de GET /:codCliente.

### POST/conta/deposito:

- recebe a seguinte estrutura: 

```bash
{
  "codCliente": integer,
  "valor": decimal,
}
```
**Em caso de operação realizada com sucesso**

- Atualiza o saldo do usuário acrescendo o valor depositado.

- devolve as seguintes informações:

```bash
{
    "codCliente": 1,
    "valor_Depositado": 1,
    "saldo": "901"
}
```
**Status HTTP 201**

**Foram feitas as seguintes validações:**

- Se o valor for <= 0:

```bash
{
    "message": "O valor não atingiu o minímo estipulado"
}
```
**Status HTTP 400**

- Se algum campo da solicitação não foi preenchido:

```bash
{
    "message": "Algum campo obrigatório está faltando"
}
```
**Status HTTP 400**

- Se o usuário não existir:

```bash
{
    "message": "Usuário não localizado"
}
```
**Status HTTP 404**

### POST/conta/saque:

- recebe a seguinte estrutura: 

```bash
{
  "codCliente": integer,
  "valor": decimal,
}
```
**Em caso de operação realizada com sucesso**

- Atualiza o saldo do usuário subtraindo o valor depositado.

- devolve as seguintes informações:

```bash
{
    "codCliente": 1,
    "valor_Retirado": 2,
    "saldo": "901"
}
```
**Status HTTP 201**

**Foram feitas as seguintes validações:**

- Se o valor for <= 0:

```bash
{
    "message": "O valor não atingiu o minímo estipulado"
}
```
**Status HTTP 400**

- Se algum campo da solicitação não foi preenchido:

```bash
{
    "message": "Algum campo obrigatório está faltando"
}
```
**Status HTTP 400**

- Se o usuário não existir:

```bash
{
    "message": "Usuário não localizado"
}
```
**Status HTTP 404**

- Se o saldo do usuário for inferior ao valor solicitado de saque:

```bash
{
    "message": "Saldo insuficiente para saque"
}
```
**Status HTTP 409**
