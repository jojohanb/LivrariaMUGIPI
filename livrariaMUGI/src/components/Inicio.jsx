import React, { useEffect, useState } from "react";
import "./inicio.css";
import imagem_6 from '../assets/image 6 (1).png';

export default function Inicio() {
  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    fetch('http://localhost:8086/livro/listar')
      .then(res => res.json())
      .then(data => {
        if (data.livros) {
          setLivros(data.livros);
        }
      })
      .catch(erro => console.error("Erro ao buscar livros:", erro));
  }, []);

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
      {/* Topo */}
      <div className="topo">
        <div></div>
        <div className="acesso">
          <a href="./login">Login</a>
          <a href="./inicio">Início</a>
          <a href="./livro">Livro</a>
          <a href="./historico">Histórico</a>
        </div>
      </div>

      {/* Texto e imagem lado a lado */}
      <div className="texto-grande">
        <div>
          <h1>LivrariaMUGI</h1>
          <p>
            Na Livraria MUGI, acreditamos que cada livro é uma chave para um novo universo. <br />
            Aqui, você encontra histórias que inspiram, ensinam e transformam. A leitura é uma <br />
            jornada única, capaz de expandir horizontes e despertar novas ideias. Venha descobrir <br />
            um espaço onde o saber e a imaginação se encontram. Dê asas à sua curiosidade e <br />
            permita-se ser tocado pelas palavras. Na MUGI, a próxima página pode mudar tudo.
          </p>
          <button>Saiba mais</button>
        </div>

        <div className="imagem-lateral">
          <img src={imagem_6} alt="Logo" />
        </div>
      </div>

      <div className="corpo-dos-livros">
        <h1>LIVROS</h1>
        <div className="campo-pesquisa">
          <input
            type="text"
            placeholder="Pesquisar por livros ..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button>Pesquisar</button>
        </div>

        <div className="galeria-livros">
          {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro, index) => (
              <img
                key={index}
                src={livro.url_capa}
                alt={`Capa do livro ${livro.titulo}`}
                title={livro.titulo}
              />
            ))
          ) : (
            <p>Nenhum livro encontrado.</p>
          )}
        </div>
      </div>

      <footer className="rodape">
        <div className="rodape-container">
          <div className="logo-footer"></div>

          <div className="footer-secoes">
            <div className="footer-bloco">
              <h3>Redes Sociais</h3>
              <div className="icones-sociais">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>

            <div className="footer-bloco">
              <h3>Acesso</h3>
              <ul>
                <li><a href="./home">Login</a></li>
                <li><a href="./inicio">Início</a></li>
                <li><a href="./historico">Histórico</a></li>
                <li><a href="/livro">Livro</a></li>
              </ul>
            </div>

            <div className="footer-bloco">
              <h3>Parcerias</h3>
              <ul>
                <li><a href="#">Editoras</a></li>
                <li><a href="#">Autores</a></li>
                <li><a href="#">Imprensa</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="copyright">© 2025 LivrariaMUGI. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

