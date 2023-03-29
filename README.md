# Node.js API Rest

## Funcionalidades

A API Rest possui as seguintes funcionalidades:

- Criar um novo registro na base de dados
- Consultar todos os registros da base de dados
- Acessar um registro específico na base de dados
- Ver o balanço/sumário de um registro específico
- Armazenar cookies por um período de 7 dias

## Tecnologias Utilizadas

- Node.js
- Fastify
- SQLite 
- PostgreSQL <a href="#observações"><sup>[1]</sup></a>
- Knex
- Typescript
- Zod
- Vitest
- Dotenv
- ESLint
- tsup
- tsc
- tsx

## Pré-requisitos

- Node.js instalado na máquina com versão mínima de 18 ou superior (Conforme a linha n° 7 do arquivo [package.json](./package.json))
- Editor de código instalado na máquina, preferencialmente <a href="https://code.visualstudio.com/">Visual Studio Code</a>

## Como instalar e executar a aplicação localmente

1. Clone o repositório para a sua máquina local digitando o comando abaixo:
```bash 
gh repo clone T0mAlexander/Nodejs-Basics
```
<b>Dica:</b> Se não quiser ou não souber usar o terminal, baixe diretamente do Github no formato de pasta comprimida (.zip)
<details>
  <summary>Captura de tela</summary>
  
  ![Baixando o repositório via .zip](https://raw.githubusercontent.com/T0mAlexander/Nodejs-Basics/media-content/download%20repository.png)
</details>

2. Acesse a pasta do repositório pelo terminal
```bash
cd Nodejs-Basics
```
<b>Dica:</b> use o explorador de pastas e arquivos de sua máquina caso não saiba comandos básicos do terminal <a href="#observações"><sup>[2]</sup></a>

<details>
  <summary>Gravação de tela</summary>
  
  ![Acessando a pasta do repositório](https://raw.githubusercontent.com/T0mAlexander/Nodejs-Basics/media-content/node%20repository%20setup.gif)
</details>

3. Como este repositório está disponível em outra ramificação/branch, execute `git switch project-02` no terminal para acessá-lo
4. Execute o comando `npm install` ou de forma reduzida `npm i` para instalar as dependências
5. Execute o comando `npm run knex -- migrate:latest` para atualizar localmente as últimas migrações/alterações da estrutura do banco de dados
6. Execute o comando `npm run server` para inicializar o servidor que estará sendo hospedado em sua rede local no endereço `http://localhost:3333`
7. Você verá uma mensagem no console do terminal `Server is running 🚀` confirmando que o servidor está funcional e pronto para uso

## Como usar a aplicação pela internet

Requisito mínimo
- Conexão com a internet com velocidade mínima de 1MBPS

Descrição: a aplicação foi hospedada na plataforma <a href="https://render.com">Render</a> como uma opção prevista para interações imediatas ao invés de usar localmente conforme instruído na seção anterior.

URL para acesso das rotas: `https://node-js-api-rest.onrender.com`

<b>Obs:</b> durante as consultas e criações de registros, é esperado que haverá atrasos no retorno das respostas em razão do banco de dados estar hospedado em Ohio, centro-oeste dos Estados Unidos.

As <a href="#exemplo-de-uso">rotas</a> da aplicação estão disponíveis na próxima seção

## Exemplo de uso

Para utilizar a API Rest, você pode utilizar um cliente HTTP, como o Postman, Insomnia, Hopscotch ou a extensão integrada ao Visual Studio Code, <a href="https://marketplace.visualstudio.com/items?itemName=RapidAPI.vscode-rapidapi-client">RapidAPI</a>, para performar requisições nas rotas disponíveis na aplicação 

## Como criar dados para interagir com a aplicação

Você deverá enviar no corpo da requisição os seguintes dados no formato JSON
Para dispensar que aprenda JSON de forma aprofundada, o trecho de código abaixo explicará um exemplo detalhado de como performar tal envio
<br>
```js
{
  "title": "Alimentação" // Invente um nome para uma transação financeira fictícia,
  "amount" 1500 // Invente um valor fictício dessa transação,
  "type": "debit" // Aqui haverá apenas dois tipos de transação que é "credit" ou "debit"
}
```
### Explicação detalhada

`"title"`: título da transação financeira, que indispensavelmente deverá ser estruturado entre aspas duplas ou simples <br>
Tipo de dado: `string` <a href="#observações"><sup>[3]</sup></a> <br>
Tipo de envio: `obrigatório`

`"amount"`: valor fictício da transação. Não necessita de ser colocado entre aspas <br>
Tipo de dado: `number` <a href="#observações"><sup>[4]</sup></a> <br>
Tipo de envio: `obrigatório`

`"type"`: tipo de transação na qual as categorias já estão predefinidas <br>
Valores predefinidos: <b>"credit"</b> ou <b>"debit"</b> <br>
`"credit"`: deverá ser usado para registrar lucro e adições financeiras <br>
`"debit"`: em oposto do valor anterior, é para registros de prejuízos, descontos ou subtrações <br>
Tipo de dado: `boolean` <a href="#observações"><sup>[5]</sup></a> <br>
Tipo de envio: `obrigatório`

<details>
  <summary>Lista de Rotas</summary>
  
  Rota padrão: `/`
  
  Consulta geral de todas as transações: `/transactions`
  
  Consulta específica de uma transação: `/transactions/<id>` <br>
  <b>Atenção:</b> o parâmetro `id` descrito acima para acesso correto deve ser inserido manualmente e está disponível nas consultas globais
  
  Checagem do sumário/balanço financeiro: `/transactions/summary`
</details>

## Termos de uso

Este projeto é de livre uso para outros sem nenhuma restrição para cópias ou forks :)

>## <section id="observações">Observações</section>

>1. PostgreSQL está sendo usado em modo de produção devido o suporte limitado da plataforma <a href="https://render.com">Render</a>.
>2. São programas com interfaces gráficas intuitivas para acessar as pastas e arquivos e.g `GNOME Files` (Linux) ou `Windows Explorer` (Windows).
>3. Em programação, `string` é um tipo de dado que aceita tanto letras junto com numerais (ou apenas um dos tipos) que será lido como um texto.
>4. O tipo de dado `number` aceita exclusivamente só numerais inteiros e também irracionais desde que esteja delimitado pelo uso do ponto (a maior parte das linguagens utilizam ponto devido ser um padrão adotado no ensino matemático de países anglófonos).
>5. O tipo `boolean` varia entre 2 valores que por padrão é verdadeiro ou falso (`true` ou `false`) mas podem ser customizados. 

### Autor: Tom Alexander
