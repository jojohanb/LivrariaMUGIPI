import React from 'react';
import { Link } from 'react-router-dom';
import './historico.css';
import logo from '../assets/image.png'

const Historico = () => {
  return (
    <div className='tudo'>
      <div className="topo">
        <div>
          {/* <img src="/Captura de tela 2025-03-31 113630.png" alt="Logo" /> */}
          {/* <img src={logo} alt="logo livraria" className='img-redonda' /> */}
        </div>
        <div className="acesso">
          <Link to="/home">Login</Link>
          <Link to="/inicio">Início</Link>
          <Link to="/livro">Livro</Link>
          <Link to="/historico">Histórico</Link>
        </div>
      </div>

      <div className="blocos-livros">
        {/* Bloco 1 */}
        <div className="bloco">
          <div className="icones">
            <i className="fas fa-edit"></i>
            <i className="fas fa-trash-alt"></i>
          </div>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cfd37592232855.5e45b55d72ca0.png" alt="Livro 1" />
          <div className="sinopse">
            <h3>O Hobbit</h3>
            <p>Bilbo Bolseiro embarca em uma jornada inesperada com anões para recuperar um tesouro guardado por um dragão.</p>
          </div>
        </div>

        {/* Bloco 2 */}
        <div className="bloco">
          <div className="icones">
            <i className="fas fa-edit"></i>
            <i className="fas fa-trash-alt"></i>
          </div>
          <img src="https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg" alt="Livro 2" />
          <div className="sinopse">
            <h3>A Culpa é das Estrelas</h3>
            <p>Hazel e Augustus vivem uma comovente história de amor enfrentando juntos os desafios do câncer.</p>
          </div>
        </div>

        {/* Bloco 3 */}
        <div className="bloco">
          <div className="icones">
            <i className="fas fa-edit"></i>
            <i className="fas fa-trash-alt"></i>
          </div>
          <img src="https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg" alt="Livro 3" />
          <div className="sinopse">
            <h3>Como Fazer Amigos e Influenciar Pessoas</h3>
            <p>Clássico de Dale Carnegie sobre técnicas de comunicação, empatia e liderança.</p>
          </div>
        </div>
      </div>

      <footer className="rodape">
        <div className="rodape-container">
          <div className="logo-footer">
            {/* <img src="/Captura de tela 2025-03-31 113630.png" alt="Logo LivrariaMUGI" /> */}
            {/* <img src={logo} alt="logo livraria" className='img-redonda' /> */}
          </div>

          <div className="footer-secoes">
            <div className="footer-bloco">
              <h3>Redes Sociais</h3>
              <div className="icones-sociais">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-x-twitter"></i></a>
              </div>
            </div>

            <div className="footer-bloco">
              <h3>Acesso</h3>
              <ul>
                <li><Link to="/home">Login</Link></li>
                <li><Link to="/inicio">Início</Link></li>
                <li><Link to="/historico">Histórico</Link></li>
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
    </div>
  );
};

export default Historico;
