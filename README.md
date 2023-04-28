# Node.js API com SOLID

>### Descrição
>Este é um projeto de API Node.js com o padrão SOLID e Design Patterns.
A aplicação tem funcionalidades como cadastros, autenticações, consultas no banco de dados, geolocalização, registro de presença, validação por token. <br>
>O projeto requer [**Node.js**](https://nodejs.org/en/download) e [**Docker**](https://docs.docker.com/get-docker/) instalados, e pode ser clonado e executado localmente seguindo as instruções nesta documentação.

## Estrutura do projeto

- [**.github**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/.github): Contém os arquivos de configuração para o Github Actions que realiza os testes automatizados do projeto
- [**env**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/env): Contém o arquivo [index.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/env/index.ts) que realiza a validação e parse das variáveis de ambiente
- [**prisma**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/prisma): Contém a pasta migrations para armazenar as migrações do banco de dados e a pasta [vitest-environment-prisma](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/prisma/vitest-environment-prisma). Além disso, possui o arquivo [schema.prisma](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/prisma/schema.prisma) que define a estrutura do banco de dados
- [**src/@types**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/@types): Contém o arquivo [jwt.d.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/@types/jwt.d.ts) que estende a interface FastifyJWT do módulo fastify-jwt
- [**src/http**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/http): Contém as pastas controllers e middlewares, além do arquivo [routes.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/http/routes.ts) que define as rotas da API
- [**src/lib**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/lib): Contém o arquivo [prisma.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/lib/prisma.ts) que cria uma instância do cliente Prisma
- [**src/repositories**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/repositories): Contém as pastas memory e prisma, além dos arquivos [check-in-repo.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/repositories/check-in-repo.ts), [gyms-repo.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/repositories/gyms-repo.ts) e [users-repo.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/repositories/users-repo.ts) que implementam os repositórios da aplicação
- [**src/services**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/services): Contém as pastas [errors](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/services/errors), [factories](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/services/factories) e [tests](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/services/tests), além dos arquivos [authenticate.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/authenticate.ts), [check-in.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/check-in.ts), [create-gym.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/create-gym.ts), [history.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/history.ts), [nearby-gyms.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/nearby-gyms.ts), [register.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/register.ts), [search-gym.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/search-gym.ts), [user-metrics.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/user-metrics.ts), [user-profile.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/user-profile.ts) e [validate-check-in.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/services/validate-check-in.ts) que implementam os serviços da aplicação
- [**src/utils**](https://github.com/T0mAlexander/Nodejs-Basics/tree/project-03/src/utils): Contém os arquivos [coords-distance.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/utils/coords-distance.ts) e [create-auth-user.ts](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/utils/create-auth-user.ts) que implementam utilidades para a aplicação
- [**src/app.ts**](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/app.ts): Este arquivo é responsável por criar uma instância do servidor web utilizando o framework Fastify. Ele também configura o servidor com middlewares, plugins e rotas, além de exportar a instância criada para ser utilizada em outros lugares do projeto
- [**src/server.ts**](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/src/server.ts): É o arquivo principal da aplicação onde está as definições e funcionamento do servidor, especificando a execução na **PORTA 3333**

## Funcionalidades gerais

- Cadastros
- Autenticações
- Consultas gerais e específicas no banco de dados
- Geolocalização
- Registro de presença (check-in)
- Persistência de dados no PostgreSQL
- Prevenção de cadastro de emails anteriormente na base de dados
- Buscas de academias baseadas na geolocalização
- Acesso ao histórico e quantidade de presenças assinaladas
- Neutralização de registro de 2 presenças dentro de 24h
- Registro de presença sob distância máxima de até 250 metros da academia
- Estipulação máxima de 10 minutos para confirmação de presença na academia
- Presenças sujeitas à aprovação dos administradores da academia
- Dados sensíveis criptografados em modo recursivo no caso de vazamento de dados
- Identificação de usuários por código de verificação/token

## Dependências e bibliotecas

- **Node.js**: plataforma de desenvolvimento em JavaScript para construção de aplicações server-side
- **Fastify**: framework web para construção de aplicações em Node.js com alto desempenho
- **Typescript**: linguagem de programação que adiciona tipagem estática e outras funcionalidades ao JavaScript
- **Docker**: plataforma de contêineres que permite empacotar, distribuir e executar aplicações em ambientes isolados
- **Vitest**: biblioteca para geração de relatórios de cobertura de testes e interface web para visualização dos resultados
- **Supertest**: biblioteca de testes de integração para aplicações HTTP/HTTPS
- **PostgreSQL**: sistema gerenciador de banco de dados relacional de código aberto
- **JSON Web Token (JWT)**: padrão de criação de tokens de acesso
- **Zod**: biblioteca para validação de esquemas de dados em TypeScript
- **Dotenv**: biblioteca para gerenciamento de variáveis de ambiente em aplicações Node.js
- **ESLint**: ferramenta para linting de código JavaScript/TypeScript
- **Prisma**: ORM (Object-Relational Mapping) para bancos de dados em Node.js
- **bcryptjs**: biblioteca para criptografia de senhas em Node.js
- **tsx**: extensão de arquivo para arquivos TypeScript que contém JSX (JavaScript XML)
- **tsup**: ferramenta de empacotamento para aplicações TypeScript

## Pré-requisitos

- **Node.js** instalado na máquina com versão mínima 18.0.0 ou superior
- **Docker** instalado na máquina com versão mínima 23.0.0 ou superior
- Editor de código instalado na máquina, preferencialmente [Visual Studio Code](https://code.visualstudio.com/)

## Como instalar e executar a aplicação localmente

1. Clone o repositório para a sua máquina local:

```bash
gh repo clone -b project-03 T0mAlexander/Nodejs-Basics
```

2. Acesse a pasta do repositório

```bash
cd Nodejs-Basics
```

**Dica:** você pode usar o explorador de arquivos do seu sistema operacional para acessar a pasta/ficheiro

3. Crie um arquivo chamado `.env` e insira as variáveis de ambiente orientando-se pelo arquivo [.env.example](https://github.com/T0mAlexander/Nodejs-Basics/blob/project-03/.env.example)

```bash
touch .env
```

4. Instale as dependências do projeto:

```bash
npm install
```

5. Inicie o servidor do Node.js digitando:

```bash
npm run server
```

>**Observação:** após isto, você verá no console `Node server is running 🚀`, informando que o servidor está executando em sua máquina no endereço `http://localhost:3333`

6. Inicie os containers/contêineres Docker na sua máquina:

```bash
docker-compose up -d
```

**Dica:** usando o parâmetro `-d`, o terminal não ficará travado ao executar

## Modelagem do Banco de Dados

Este projeto utiliza o PostgreSQL. A URL de conexão é definida por uma variável de ambiente `DATABASE_URL` no arquivo docker-compose.yml

### Tabela `User` 👤

**Descrição:** representa um usuário da aplicação

- `id`: ID do usuário (UUID);
- `name`: nome do usuário;
- `email`: endereço de email do usuário, único na base de dados
- `password_hash`: hash da senha do usuário com 6 dígitos mínimos
- `role`: permissões do usuário (um enum com os valores `ADMIN` ou `MEMBER`)
- `creation_date`: data de criação do usuário (um `DateTime`, com valor padrão definido para o momento da criação)
- `CheckIns`: relação com os check-ins realizados pelo usuário

### Tabela `CheckIn` 🗓️

**Descrição:** representa um check-in realizado pelo usuário em uma academia

- `id`: ID do check-in (UUID)
- `creation_date`: data de criação do check-in (um `DateTime`, com valor padrão definido para o momento da criação)
- `validation_date`: data de validação do check-in por um administrador da academia (opcional, pode ser `null` caso o check-in não tenha sido validado
- `user`: relação com o usuário que realizou o check-in
- `gym`: relação com a academia em que o check-in foi realizado

### Tabela `Gym` 🏋️

**Descrição:** representa uma academia na base de dados.

- `id`: ID da academia (UUID)
- `name`: nome da academia
- `phone`: número de telefone da academia (opcional)
- `description`: descrição da academia (opcional)
- `latitude`: latitude da localização da academia (um `Decimal`)
- `longitude`: longitude da localização da academia (um `Decimal`)
- `CheckIns`: relação com os check-ins realizados na academia

## Rotas HTTP 🚦

- 🧠 **Lembre-se:** o endereço base é **`http://localhost:3333`** e para fazer requisições, envie sempre no formato **JSON**
- 💡 **Dica de ouro**: caso queira ver a interface do banco de dados, digite no terminal `npx prisma studio`

### Rotas de Usuário

- `POST /users`: cria um novo usuário na base de dados

  <details>
    <summary>Estrutura da requisição</summary>

    ```json
    {
      "name": "string", //obrigatório
      "email": "string", //obrigatório
      "password:": "string" //obrigatório, minímo 6 digitos
    }
    ```

  </details>

- `POST /sessions`: autentica um usuário na aplicação e retorna um token de acesso

  <details>
    <summary>Estrutura da requisição</summary>

    ```json
    {
      "email": "string", //obrigatório
      "password:": "string" //obrigatório
    }
    ```

  </details>

- `PATCH /token/refresh`: renova um token de acesso expirado usando um token de atualização

  <details>
    <summary>Cabeçalho e estrutura da atualização</summary> <br>

  > - **Requisito:** token de acesso da rota `/users`
  > - **Observação:** alguns testadores de API podem falhar, então pode ser que necessite digitar o token no Cookie dentro do cabeçalho da requisição (Headers)

    ```json
      //Cabeçalho (Headers)

      Cookie: refreshToken=<token>
    ```

    ```json
      // Corpo (Body)

    {
      "email": "string", //obrigatório
      "password:": "string" //obrigatório
    }
    ```

  </details>

- `GET /me`: retorna informações do perfil do usuário autenticado. A rota é protegida por autenticação JWT, implementada através do middleware `JWTVerification` utilizando a propriedade `onRequest` do objeto de opções da rota

  <details>
    <summary>Cabeçalho da busca</summary> <br>

    **Obs:** esta rota apenas retorna informações. Não é necessário enviar um corpo da requisição.

    ```json
    Authorizariton: Bearear <token>
    ```

  </details>

### Rotas de Academias

> **Dica de ouro:** para melhor experiência testando as rotas de academia e check-in, use a latitude e longitude fornecida na URL do Google Maps
![Google Maps URL](https://raw.githubusercontent.com/T0mAlexander/Nodejs-Basics/media-content/latitude%20e%20longitude.png)

Essas rotas utilizam os seguintes hooks:

- `onRequest`: adiciona o interceptador (middleware) `JWTVerification` em todas as requisições recebidas pela aplicação

  > 🛡️ A rota `/gyms` é restrita a usuários com cargo `ADMIN`, e essa restrição é implementada através do middleware `RoleVerification` utilizando a propriedade `onRequest` do objeto de opções da rota. Além disso, todas as rotas da aplicação passam pelo middleware `JWTVerification` devido ao uso do hook `onRequest`

- `POST /gyms`: cria uma nova academia na base de dados. A rota é restrita a usuários com cargo `ADMIN`

  <details>
    <summary>Cabeçalho e estrutura da requisição</summary>

    >**Obs:** Para interagir com esta rota, execute o comando `npx prisma studio`. Na tabela `User`, escolha um usuário criado por você e procure a coluna `role` e clique 2x para alterar o valor de `MEMBER` para `ADMIN`. Feito isso, faça autenticação deste mesmo usuário na rota `/sessions`, e faça os passos abaixo

    ```json
    // Cabeçalho

    Authentication: Bearer <token-ADMIN>
    ```

    ```json
    // Corpo (Body)

    {
      "name": "string", //obrigatório
      "phone": "string", //obrigatório
      "description:": "string", //obrigatório
      "latitude": "number", //obrigatório, latitude > 0
      "longitude": "number" //obrigatório, longitude > 0
    }
    ```

  </details>

- `GET /gyms/search`: busca academias por nome

  <details>
    <summary>Cabeçalho e parâmetro da busca</summary>

    ```json
    // Parâmetro de busca (query)

    q: <nome da academia> // obrigatório, acrônimo para "query" ("busca" em inglês)
    ```

    ```json
    // Cabeçalho (Headers)

    Authorization: Bearer <token>
    ```

  </details>

- `GET /gyms/nearby`: busca academias próximas à localização do usuário em um raio de até 10 km

  <details>
    <summary>Cabeçalho e parâmetro da busca</summary><br>

    > **Dica**: teste esta rota com uma academia dentro do raio de 10 km e com outra que exceda essa distância mínima

    > **Obs:** a latitude e longitude inserida será a sua localização fictícia para verificar quais academias estão dentro de 10 km

    ```json
    // Parâmetro de busca (query)

    latitude: <valor> // obrigatório, valor numérico
    longitude: <valor> // obrigatório, valor numérico
    ```

    ```json
    // Cabeçalho (Headers)

    Authorization: Bearer <token>
    ```

  </details>

### Rotas de Check-in

- `POST /gyms/:gymId/check-ins`: cria um novo registro de check-in para a academia especificada pelo `gymId`

  <details>
    <summary>Cabeçalho e estrutura da requisição</summary> <br>

    **Requisitos:** ID de uma academia existente no banco de dados

    > **Lembre-se:** a distância máxima para check-in é até 250 metros

    ```json
    // Cabeçalho (Headers)

    Authorization: Bearer <token>
    ```

    ```json
    // Corpo (Body)

    {
      "latitude": "number", //obrigatório
      "longitude": "number", //obrigatório
    }
    ```

  </details>

- `PATCH /check-ins/:checkInID/validate`: atualiza o status de validação do check-in com o `checkInID` especificado. A rota é restrita a usuários com cargo `ADMIN`

  <details>
    <summary>Cabeçalho da requisição</summary> <br>

    **Lembrete:** check-ins expiram em 20 minutos após sua emissão

    ```json
    Authorization: Bearer <token-ADMIN>
    ```

  </details>

- `GET /check-ins/history`: retorna um histórico com os registros de todos os check-in

  <details>
    <summary>Cabeçalho da requisição</summary> <br>

    ```json
    Authorization: Bearer <token>
    ```

  </details>

- `GET /check-ins/metrics`: retorna métricas relacionadas a quantidade de registros de check-in realizados

  <details>
    <summary>Cabeçalho da requisição</summary> <br>

    ```json
    Authorization: Bearer <token>
    ```

  </details>

## Termos de uso

Este projeto é de livre uso para outros sem nenhuma restrição para cópias ou forks 👍🏻

### Autor: Tom Alexander
