import React from "react";
import "./inicio.css";
import imagem_6 from '../assets/image 6 (1).png';

export default function Inicio() {
  return (
    <>
      {/* Topo */}
      <div className="topo">
        <div>
          {/* <img src={imagem_6} alt="Logo" /> */}
        </div>
        <div className="acesso">
          <a href="./login">Login</a>
          <a href="./inicio">Início</a>
          <a href="./livro">Livro</a>
          <a href="./historico">Histórico</a>
        </div>
      </div>

      {/* texto e imagem lado a lado */}
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
          {/* <img id="img-maior" src="/image 6.png" alt="Imagem ilustrativa" /> */}
          <img  src={imagem_6} alt="Logo" />
        </div>
      </div>

      <div className="corpo-dos-livros">
        <h1>LIVROS</h1>
          <div className="campo-pesquisa">
            <input type="text" placeholder="Pesquisar por livros ..." />
            <button>Pesquisar</button>
          </div>
        <div className="galeria-livros">
          <img src="https://i.pinimg.com/originals/ad/f0/b8/adf0b8235bdda40c2a0bd090698345a1.jpg" alt="" />
          <img src="https://diadebrilho.com/wp-content/uploads/2012/07/bookthief.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/cf/56/ba/cf56ba7ee3c9e6df2a80dc96623b02bc.jpg" alt="" />
          <img src="https://th.bing.com/th/id/OIP.wm3KnkJ4gCh4mY_iEzwC2gHaKd?rs=1&pid=ImgDetMain" alt="" />
          <img src="https://3.bp.blogspot.com/-SKq5Nlj2bws/U2__z9QsBYI/AAAAAAAAAPs/_esBjkbwQsQ/s1600/Capa_Como-eu-era-antes-de-voce2.jpg" alt="" />
          <img src="https://designcomcafe.com.br/wp-content/uploads/2017/08/capas-de-livros-the-bell-jar-sylvia-plath.jpg" alt="" />

          <img src="https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg" alt="" />
          <img src="https://www.record.com.br/wp-content/uploads/2019/07/11791.jpeg" alt="" />
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cfd37592232855.5e45b55d72ca0.png" alt="" />
          <img src="https://fl-storage.bookinfometadados.com.br/uploads/book/first_cover/800_9786550971458.jpg" alt="" />
          <img src="https://th.bing.com/th/id/OIP.I47GxeAt-YpPXJZ-xU40XwHaLN?w=500&h=757&rs=1&pid=ImgDetMain" alt="" />
          <img src="https://th.bing.com/th/id/OIP.8ZHEf0o2xQLlN4ZVf2fA4gHaJ9?w=595&h=800&rs=1&pid=ImgDetMain" alt="" />

          <img src="https://m.media-amazon.com/images/I/71PaY+d6LSL._SY522_.jpg" alt="" />
          <img src="https://th.bing.com/th/id/R.4ed8a5d2ca9e44e06b029cc55e5e3d97?rik=0wCkDXVe%2f6DQdg&pid=ImgRaw&r=0" alt="" />
          <img src="https://http2.mlstatic.com/D_NQ_NP_2X_647141-MLB40913711411_022020-F.jpg" alt="" />
          <img src="https://th.bing.com/th/id/OIP.XJIum7R-v-d1xFg5Dg4BxQHaKE?w=500&h=680&rs=1&pid=ImgDetMain" alt="" />
          <img src="https://marketplace.canva.com/EAD0UFx27hs/1/0/512w/canva-siena-ilustra%C3%A7%C3%A3o-de-napole%C3%A3o-capa-de-livro-wPahEVwVXZY.jpg" alt="" />
          <img src="https://www.saraivaconteudo.com.br/capas/02/download-os-vandalos-a-historia-e-o-legado-dos-barbaros-mais-famosos-da-antiguidade-charles-river-editors-ler-online-pdf.jpg" alt="" />
        </div>
      </div>

      <footer className="rodape">
        <div className="rodape-container">
          <div className="logo-footer">
            {/* <img src="/Captura de tela 2025-03-31 113630.png" alt="Logo LivrariaMUGI" /> */}
            {/* <p>LivrariaMUGI — Transformando páginas em experiências.</p> */}
          </div>

          <div className="footer-secoes">
            <div className="footer-bloco">
              <h3>Redes Sociais</h3>
              <div className="icones-sociais">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                {/* <a href="#"><i className="fab fa-x-twitter"></i></a> */}
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
