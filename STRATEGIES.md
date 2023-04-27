# Node.js API com SOLID

## Funcionalidades

Esta aplicação possui similaridades com lógicas sistêmicas do Gympass

## Requisitos Funcionais

- [x] Cadastros
- [x] Autenticação
- [x] Realização de um check-in pelo usuário
- [x] Consultar o perfil de um usuário logado
- [x] Consultar o histórico de check-ins
- [x] Criação de academias
- [x] Consultar o n° de check-ins feitos pelo usuário logado
- [x] Buscas de academias pelo nome
- [x] Buscas de academias dentro do raio de 10km
- [x] Validação do check-in do usuário pelos administradores da academia

## Regras de Negócios

- [x] Impedir cadastro de endereços de email duplicados
- [x] Impedir 2 check-in no mesmo dia
- [x] Impedir check-in numa distância acima de 100 metros da academia
- [x] Estipular tempo máximo de 20 minutos para validação do check-in
- [ ] Check-in apenas será validado por administradores
- [ ] Academias serão cadastradas apenas por administradores

## Requisitos Não-Funcionais

- [x] Senhas devem ser criptografadas por segurança
- [x] Persistência de dados com PostgreSQL
- [x] Lista de dados com 20 itens por página
- [ ] Identificação de usuários com JSON Web Token (JWT)
