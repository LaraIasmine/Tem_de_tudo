# Tem_de_tudo

API construída como mockup para a integração de um sistema de gerenciamento de uma loja, a fim de teste para vaga.

link repositório do enunciado do teste: https://github.com/diglopes/tem-de-tudo-development-test

## Sprints do projeto 

<table class="gn-seletable">
<tbody><tr>
<th>SPRINT</th>
<th>DESCRIÇÃO</th><th>TEMPO ESTIMADO</th><th>STATUS</th></tr>
<tr>
<td>BASE DA API</td>
<td>Criação da pasta src, definição de porta localhost para testes e configuração de acesso. Também são feitas as instalações de módulos necessários (express e nodemon)</td><td>20 min</td><td>FEITO</td></tr>
<tr><td>BANCO DE DADOS INICIAL</td><td>Criar entidades e fazer a correlação entre elas com as chaves estrangeiras necessárias</td><td>40 min</td><td>FEITO</td></tr><tr><td>ALIMENTAR BANCO DE DADOS</td><td>Criar script com dados para alimentar o banco de dados</td><td>20 min</td><td>FEITO</td></tr><tr><td>DOCKER-COMPOSE</td><td>Criação do arquivo docker-compose e Dockerfile para geração da imagem docker com o banco de dados (tempo estimado maior devido a pesquisa e estudo sobre o uso de docker compose e Dockerfile)</td><td>1h30</td><td>FEITO</td></tr><tr><td>DEFINIÇÃO ENDPOINTS</td><td>Definição de endpoints mínimos necessários para funcionalidade da API</td><td>20min</td><td>FEITO</td></tr><tr><td>FUNCIONALIDADE DOS ENDPOINTS</td><td>Fazer estrutura da função dos endpoints conectado com o banco de dados</td><td>40 min</td><td>EM ANDAMENTO</td></tr><tr><td>INFOS NA IMAGEM DOCKER</td><td>Inserir na imagem docker os dados do banco de dados</td><td>-</td><td>A FAZER</td></tr><tr><td>REVISÃO</td><td>Revisão dos endpoints e funcionalidades da API</td><td>1h</td><td>A FAZER </td></tr></tbody></table>

## Clonando o repositório

No cmd, navegue até o diretório em que deseja clonar o repositório.

Dentro do diretório, utilize o comando:
```
git clone https://github.com/LaraIasmine/Tem_de_tudo.git
```

## Instalando as dependências

    npm install

## Executando a aplicação

    npm run dev
    
# REST API

A REST API construída está especificada abaixo

## **Host e porta**

<localhost:3000>

## **Métodos**

### **Método 1: GET**

Retorna a somatória de todas as vendas da semana

### **URL**

`/vendas`

### **Requisição**

`/vendas`

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  INSERIR
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não há venda cadastrada na última semana."
  }
  ```

---

### **Método 2: GET**

Retorna o lucro semanal 

### **URL**

`/lucro`

### **Requisição**

`/lucro`

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
   INSERIR
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não há vendas na semana."
  }
  ```


### **Método 3: GET**

Retorna o vendedor que vendeu o maior valor

### **URL**

`/topVendedor`

### **Parâmetro de requisição na URL**

Nenhum


### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "error": "Não há vendedor cadastrado"
  }
  ```

---

### **Método 4: GET**

Retorna o cliente que comprou o maior valor 

### **URL**

`/topCliente`

### **Parâmetro de requisição na URL**

Nenhum


### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-400%20BAD%20REQUEST-red)

- Conteúdo:

  ```json
  {
    "error": "Não há cliente cadastrado"
  }
  ```

---
### **Método 5: POST**

Recebe um JSON com dados de uma venda e a insere no banco de dados

### **URL**

`/venda`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

```json
{
INSERIR
}
```

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não foi possível cadastrar venda"
  }
  ```
---
### **Método 6: POST**

Recebe um JSON com dados de um novo cliente e o insere no banco de dados

### **URL**

`/cliente`

### **Parâmetro de requisição no BODY**

```json
{
INSERIR
}
```

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não foi possível cadastrar cliente"
  }
  ```
---

 ### **Método 7: POST**

Recebe um JSON com dados de um novo vendedor e o insere no banco de dados

### **URL**

`/vendedor`

### **Parâmetro de requisição no BODY**

```json
{
INSERIR
}
```

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não foi possível cadastrar vendedor"
  }
  ```
---
 ### **Método 8: POST**

Recebe um JSON com dados de um novo produto e o insere no banco de dados

### **URL**

`/produto`

### **Parâmetro de requisição no BODY**

```json
{
INSERIR
}
```

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    {
      INSERIR
    }
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Não foi possível cadastrar produto"
  }
  ```
---



### **Método 9: PUT**

Recebe um JSON com dados de um cliente, com ID especificado na URL e atualiza seus dados na base de dados

### **URL**

`/cliente/{id}`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

```json
{
  INSERIR
}
```

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    INSERIR
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "Cliente atualizado com sucesso."
  }
  ```

---

### **Método 10: PUT**

Recebe um JSON com dados de um produto, com ID especificado na URL e atualiza seus dados na base de dados

### **URL**

`/produtos/{id}`

### **Parâmetro de requisição na URL**

`id=[INTEGER]`

### **Parâmetro de requisição no BODY**

Nenhum

### **Requisição**

`/produtos/1`

### **Resposta de sucesso**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-200%20OK-brightgreen)

- Conteúdo:

  ```json
  [
    INSERIR
  ]
  ```

### **Resposta de erro**

- Status:

  ![Status da requisicao](https://img.shields.io/badge/-404%20NOT%20FOUND-red)

- Conteúdo:

  ```json
  {
    "error": "O produto não existe."
  }
  ```
