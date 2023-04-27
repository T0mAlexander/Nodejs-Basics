# Comandos usuais

- ### Inicializar container
  ```bash
  docker start <nome-do-container>
  ```
- ### <span id="2">Interromper container</span>
  ```bash 
  docker stop <nome-do-container>
  ```

- ### Ver relatórios/logs do container
  ```bash
  docker logs <nome-do-container>
  ```
  ><b>Dica:</b> ao digitar o parâmetro `-f`, os <u>logs do container</u> vão surgir quando houver alterações em tempo real
    <details>
      <summary>Exemplo</summary>
      
      docker logs <nome-do-container> -f
    </details>

- ### Guia de comandos Docker

  ```bash
  docker --help
  ```
  <details>
    <summary>O que isso irá fazer?</summary>
    <br>
    <b>R:</b> Irá listar opções e parâmetros disponíveis para suprir sua demanda
  </details>

- ### Variáveis `-e`
  ```bash
  docker run (...) -e <nome-da-variável>=<valor-da-variável>
  ```

  ><b>Explicação</b>: o nome da variável é o que foi predefinido na documentação da imagem pré-pronta escolhida no Docker Hub. O valor é o que você irá inserir pra ajustar a sua demanda
  <details>
    <summary>Exemplo prático</summary>

    ```bash
    docker run --name projeto-01 imagem-do-dockerhub -e LOGIN_NAME=docker -e PASSWORD=123
    ```

  </details>

- ### Publicação de portas `-p`
  ```bash
  docker run [...] -p <porta-rede-local>:<porta-do-container>
  ```
  ><b>Explicação:</b> na criação de uma nova imagem, o parâmetro `-p` serve para publicar a porta do container para a porta da sua rede local
  <details>
    <summary>Exemplo no terminal</summary>

    ```bash
    docker run [...] -p 5432:5000
    ```

    ><b>Explicação:</b> a porta `5000` está sendo mapeada do container para a porta `5432` na sua rede local.

  </details>

- ### Criar container baseado em uma imagem do Dockerhub Library
  ```bash
  docker run --name <nome-do-container> <nome-imagem-dockerhub>:latest -e <param-01>=<valor-param-01> -e <param-02>=<valor-param-02> -p <porta-da-imagem>:<porta-rede-local>
  ```

- ### Criar container baseado em um arquivo `docker-compose.yml`
  ```bash
  docker compose up
  ```
  ><b>Sugestão:</b> digite o parâmetro `-d` para que o container execute em segundo plano

  ><b>Aviso:</b> É necessário que você esteja no mesmo diretório onde ele está localizado. Caso queira informar um caminho relativo, consulte o exemplo abaixo

  <details>
    <summary>Exemplo no terminal</summary>
    <h4>Informando um caminho relativo</h4>

    ```bash
    docker compose -f caminho/relativo/até/o/arquivo docker-compose.yml up
    ```

    ><b>Informação:</b> o parâmetro `-f` é a forma reduzida de se escrever `--file`. Sua finalidade é informar um caminho relativo como exemplificado acima <br>
    O parâmetro `up` tem a finalidade de (re)criar e executar contêineres

  </details>

- ### Listar todos os containers
  ```bash
  docker ps -a
  ```

- ### Remover apenas um container
  ```bash
  docker rm <nome-do-container>
  ```
  ><b>Aviso:</b> é necessário <a href="#2">interromper a execução do container</a> antes de removê-lo

- ### Remover todos os containers
  ```bash
  docker compose down
  ```
