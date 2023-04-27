# Node.js API com SOLID <br>
### Descrição
Esta aplicação foi construída com lógicas sistêmicas similares ao aplicativo <a href="https://play.google.com/store/apps/details?id=com.gympass">Gympass</a>

## Funcionalidades gerais

- Cadastros
- Autenticações
- Consultas gerais e específicas no banco de dados
- Geolocalização
- Registro de presença (check-in)
- Persistência de dados no PostgreSQL

> - ### Funcionalidades específicas <br>
> - Prevenção de cadastro de emails anteriormente na base de dados
> - Buscas de academias baseadas na geolocalização
> - Acesso ao histórico e quantidade de presenças assinaladas
> - Neutralização de registro de 2 presenças dentro de 24h
> - Supressão de registro de presença sob distância acima de 100 metros da academia
> - Estipulação máxima de 20 minutos para confirmação de presença na academia
> - Presenças sujeitas à aprovação dos administradores da academia
> - Dados sensíveis criptografados em modo recursivo no caso de vazamento de dados
> - Identificação de usuários por código de verificação/token

## Tecnologias usadas
- Node.js
- Fastify
- Typescript
- Docker
- Vitest (Coverage & UI)
- PostgreSQL
- JSON Web Token (JWT)
- Design Patterns
- SOLID
- Zod
- Dotenv
- ESLint
- Prisma
- bcryptjs
- tsx
- tsup
