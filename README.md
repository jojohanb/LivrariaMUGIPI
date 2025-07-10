<!-- Título e descrição do projeto (2 pontos): O README.md deve começar com o nome do projeto e uma descrição clara e objetiva do que se trata o sistema (por exemplo: "Sistema para gerenciamento de uma biblioteca escolar, com cadastro de livros e autores"). -->
# LIVRARIA MUGI

## A Livraria MUGI é um Sistema para gerenciamento de uma biblioteca escolar, onde pode-se cadastrar, listar, atualizar e deletar livros, autores, etc, ligado a um Banco de dados PostgreSQL para armazenar os dados cadastrados

<!-- Instruções de instalação e execução (3 pontos): O arquivo deve conter um passo a passo com os comandos necessários para instalar as dependências e executar tanto o backend quanto o frontend do projeto localmente. Exemplo: uso de npm install, npm start, variáveis de ambiente, porta da API, etc. -->

## INSTRUÇÕES:

Para executar o código, primeiro deve se abrir o terminal(Ctrl + J), depois, é necessário ligar o backend, para isso, digite o comando: "cd backend", então digite "npm install"(Ou npm i) para instalar as dependências, e então, ligue o banco de dados com o comando "Node app.js".
Após isso, abra um novo terminal(mantendo o anterior ligado), e digite o comando "cd livrariaMUGI" para acessar a pasta do frontend, em seguida, "npm i" novamente, e por fim, "npm run dev" para rodar as páginas do frontend do website.

<!-- Descrição da estrutura do projeto (2 pontos): Apresentar, de forma simples, como o código está organizado. Por exemplo: "As rotas da API estão na pasta routes/, os componentes React estão na pasta src/components/, etc." -->

## DESCRIÇÃO ESTRUTURA
### Pastas Backend:
Na pasta do backend temos as seguintes pastas:
* **config:** Contém o arquivo database.js, que é para configuração de conexão com o banco de dados.
* **controller:** Contém os arquivos de controller para cada tabela, onde ficam as rotas do crud(Cadastro, listagem, atualização e deleção).
* **model:** Contém os arquivos ".dao"" de cada tabela, onde ficam as funções utilizadas para validar os dados inseridos e realizar as requisições do crud.
### Arquivos backend: 
* **.env:** Contém a conexão com o banco de dados PostgreSQL.
* **app.js:** Contém os caminhos para cada conjunto de rotas das tabelas.
* **database.sql:** Contém o script da criação do banco de dados.
* **testando.http:** Contém testes das requisições http.

## Pastas livrariaMUGI:
Na pasta "livrariaMUGI", temos as seguintes pastas e arquivos:
* **Pastas:**
    * **src:** Contém 2 pastas e 4 arquivos:
        * **Pastas:**
            * **assets:** Ícones utilizados na estilização das páginas do frontend.
            * **components:** Contém a estilização e código React(jsx) das páginas do frontend.
            *  **Arquivos:**
            * **App.jsx, App.css:** Contém as rotas das páginas do frontend(jsx), e estlização(css)
            * **index.css:** Contém dependências do tailwindcss.
            * **main.jsx:** Contém a rota raíz do código.
* **Arquivos:**
    * **index.html:** Estrutura html do código
    * **Outros arquivos de dependência como package.json**

<!-- Exemplos de uso ou funcionalidades implementadas (2 pontos): O grupo deve descrever (ou ilustrar com prints/capturas de tela) pelo menos uma funcionalidade implementada, ou o uso de uma rota da API (por exemplo: "rota GET /livros retorna a lista de livros cadastrados"). -->
## Cadastro de livros
### Exibido na print abaixo, mostrando os campos necessários preenchidos e o Alert indicando que o livro foi cadastrado com sucesso, e então o livro sendo listado pós cadastro, com as imagens de suas capas sendo exibidas no frontend, uma para cada livro cadastrado no banco de dados:


<!-- Autores e responsabilidades (1 ponto): Ao final do README.md, incluir os nomes dos integrantes do grupo e, se possível, indicar brevemente o que cada um contribuiu no projeto (ex: backend, frontend, testes, documentação). -->
# ALUNOS:
## Murilo Ramalheira Robetti --> Algumas Tabelas do backend(".dao", "controller"), Script do BD, este arquivo markdown(documentação), conexão com o banco, modelo entidade relacionamento, ligações do modelo entidade-relacionamento.
## Giovana Fernanda de Oliveira --> Frontend, Algumas Tabelas do backend(".dao", "controller"), conexão com o banco, testes, modelo entidade relacionamento, ligações do modelo entidade-relacionamento.

<div align="center">
  <img src="https://i.pinimg.com/564x/f7/7b/74/f77b7414c16daaa5cdff30aff2d7ed29.jpg" >
</div>