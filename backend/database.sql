DROP TABLE IF EXISTS LIVRO_TEM_EDITORA;
DROP TABLE IF EXISTS LIVRO_TEM_CATEGORIA;
DROP TABLE IF EXISTS LIVRO_AUTORES;
DROP TABLE IF EXISTS EMPRESTIMO;
DROP TABLE IF EXISTS CURSO_PESSOA;
DROP TABLE IF EXISTS DIVIDAS;
DROP TABLE IF EXISTS PESSOA;
DROP TABLE IF EXISTS AUTORES;
DROP TABLE IF EXISTS CURSO;
DROP TABLE IF EXISTS TIPO;
DROP TABLE IF EXISTS LIVRO;
DROP TABLE IF EXISTS ARVORE_CATEGORIA;
DROP TABLE IF EXISTS EDITORA;
DROP TABLE IF EXISTS CATEGORIA;


CREATE TABLE TIPO (
    tipo_id INT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE PESSOA (
    ra_pessoa INT PRIMARY KEY,
    tipo_id INT REFERENCES TIPO(tipo_id),
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    login VARCHAR UNIQUE,
    senha VARCHAR
);

CREATE TABLE EDITORA (
    id_editora SERIAL PRIMARY KEY,
    nome_editora VARCHAR(100) NOT NULL
);

CREATE TABLE CATEGORIA (
    id_categoria SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE ARVORE_CATEGORIA (
    id_subcategoria SERIAL PRIMARY KEY,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

CREATE TABLE LIVRO (
    id_livro serial PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    titulo VARCHAR(40) NOT NULL,
    id_editora INT REFERENCES EDITORA(id_editora),
    qtd_disponivel INT NOT NULL,
    edicao VARCHAR(20),
    id_categoria INT REFERENCES CATEGORIA(id_categoria),
    id_subcategoria INT REFERENCES ARVORE_CATEGORIA(id_subcategoria)
);

CREATE TABLE AUTORES (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE LIVRO_AUTORES (
    id_livro INT,
    id_autor INT,
    PRIMARY KEY (id_livro, id_autor),
    FOREIGN KEY (id_livro) REFERENCES LIVRO(id_livro),
    FOREIGN KEY (id_autor) REFERENCES AUTORES(id_autor)
);

CREATE TABLE EMPRESTIMO (
    id_emprestimo serial PRIMARY KEY,
    ra_pessoa INT REFERENCES PESSOA(ra_pessoa),
    id_livro INT REFERENCES LIVRO(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    historico VARCHAR(255)
);

CREATE TABLE CURSO (
    id_curso SERIAL PRIMARY KEY,
    nome_curso VARCHAR(30)
);

CREATE TABLE CURSO_PESSOA (
    ra_pessoa INT,
    id_curso INT,
    ano_ingresso DATE,
    PRIMARY KEY (ra_pessoa, id_curso),
    FOREIGN KEY (ra_pessoa) REFERENCES PESSOA(ra_pessoa),
    FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE DIVIDAS (
    id_divida SERIAL PRIMARY KEY,
    ra_pessoa INT REFERENCES PESSOA(ra_pessoa),
    valor_divida FLOAT,
    data_vencimento DATE,
    status VARCHAR(50),
    id_livro INT REFERENCES LIVRO(id_livro)
);

CREATE TABLE LIVRO_TEM_EDITORA (
    id_livro INT,
    id_editora INT,
    PRIMARY KEY (id_livro, id_editora),
    FOREIGN KEY (id_livro) REFERENCES LIVRO(id_livro),
    FOREIGN KEY (id_editora) REFERENCES EDITORA(id_editora)
);

CREATE TABLE LIVRO_TEM_CATEGORIA (
    id_livro INT,
    id_categoria INT,
    PRIMARY KEY (id_livro, id_categoria),
    FOREIGN KEY (id_livro) REFERENCES LIVRO(id_livro),
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);