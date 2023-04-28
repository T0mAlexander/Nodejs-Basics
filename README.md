# Projeto Node.js

Este projeto consiste em uma aplicação Node.js para gerenciamento de usuários utilizando uma base de dados no formato JSON. A aplicação conta com rotas para consultar, adicionar, atualizar e deletar usuários.

## Uso

Para rodar a aplicação, é necessário ter o Node.js instalado. Na pasta raiz do projeto, execute o seguinte comando:

```bash
npm run server
```

Após a execução do comando, o servidor ficará disponível em `http://localhost:3000`.

## Dependências

O projeto depende das seguintes bibliotecas:

- `node:fs/promises`: biblioteca para leitura e escrita de arquivos no formato JSON
- `node:crypto`: biblioteca para geração de IDs únicos
- `http`: biblioteca para criação de servidor HTTP

## Estrutura do Projeto

A estrutura de pastas e arquivos do projeto é a seguinte:

- `src`: pasta com o código fonte da aplicação
  - `middlewares`: pasta com middlewares utilizados pela aplicação
    - `json.js`: middleware para tratar o corpo da requisição como JSON
  - `utils`: pasta com utilitários utilizados pela aplicação
    - `build-route-path.js`: utilitário para construção de rotas
    - `extract-query-params.js`: utilitário para extrair parâmetros de consulta da URL
  - `database.js`: arquivo que define a classe `Database`, responsável por realizar operações na base de dados
  - `routes.js`: arquivo que define as rotas da aplicação
  - `server.js`: arquivo que cria o servidor HTTP e define suas rotas
- `streams`: O diretório streams contém quatro arquivos que demonstram o uso de streams em Node.js
  - **basics.js:** O arquivo basics.js define três classes de stream:
    - `onetohundred`: uma implementação de um stream legível que gera números de 1 a 100 em intervalos de 1 segundo.
    - `inv`: uma implementação de um stream transformável que inverte o sinal dos números recebidos.
    - `multi`: uma implementação de um stream gravável que multiplica os números recebidos por 10 e os exibe no console.
  - **buffers.js:** O arquivo buffers.js define uma variável buffer que contém a string 'ok' em um buffer e exibe o resultado da conversão do buffer em JSON.
  - **fake-upload.js:** O arquivo fake-upload.js define uma variável buffer que contém a string 'ok' em um buffer e exibe o resultado da conversão do buffer em JSON.
  - **http-server.js:** O arquivo http-server.js define uma classe inv que inverte o sinal dos números recebidos em um stream. O arquivo também define um servidor HTTP que recebe dados de entrada do cliente, inverte o sinal dos números recebidos usando a classe inv e retorna o resultado invertido para o cliente.

- `package.json`: arquivo que define as informações do projeto, incluindo suas dependências
- `package-lock.json`: arquivo gerado automaticamente pelo npm para controle de versão das dependências

## Modelagem de Dados

A base de dados da aplicação está armazenada no arquivo `db.json` na pasta `stream`. A base de dados consiste em uma lista de usuários, onde cada usuário é representado por um objeto com os seguintes campos:

- `id`: identificador único do usuário, gerado automaticamente pela aplicação
- `name`: nome do usuário
- `email`: endereço de e-mail do usuário

## Rotas HTTP

A aplicação conta com as seguintes rotas:

- `GET /users`: retorna uma lista de usuários da base de dados. Aceita um parâmetro de consulta `search`, que pode ser utilizado para buscar usuários pelo nome ou pelo e-mail.
- `POST /users`: adiciona um novo usuário à base de dados. O corpo da requisição deve conter os campos `name` e `email` do novo usuário.
- `PUT /users/:id`: atualiza um usuário existente na base de dados. O ID do usuário deve ser informado na URL da requisição. O corpo da requisição deve conter os campos `name` e `email` atualizados.
- `DELETE /users/:id`: deleta um usuário existente na base de dados. O ID do usuário deve ser informado na URL da requisição.

## Observações

- Ao executar o servidor pela primeira vez, será criado automaticamente o arquivo `db.json` na pasta `stream`, caso ele não exista.
- A classe `Database` utiliza a biblioteca `node:fs
