
import React, { useState } from 'react';
import './livros.css';

const Livros = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [urlCapa, setUrlCapa] = useState('');

  // Função para cadastrar autor
  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8086/autor/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: autor }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar autor');
      }

      const autorCadastrado = await response.json();
      console.log('Autor cadastrado:', autorCadastrado);

      setTitulo('');
      setAutor('');
      setUrlCapa('');
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro:', error.message);
      alert('Falha ao cadastrar autor. Tente novamente.');
    }
  };

  // Função para deletar autor
  const handleDeletarAutor = async () => {
    if (!autor) {
      alert("Informe o nome do autor para deletar.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8086/autor/deletar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: autor }),
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar autor');
      }

      const resultado = await response.json();
      console.log('Autor deletado:', resultado);

      alert('Autor deletado com sucesso!');
      setAutor('');
      setTitulo('');
      setUrlCapa('');
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao deletar autor:', error.message);
      alert('Erro ao deletar autor. Verifique o nome e tente novamente.');
    }
  };

  // Função para atualizar autor
  const handleAtualizarAutor = async () => {
    const idAutor = prompt("Digite o ID do autor que deseja atualizar:");
    if (!idAutor || isNaN(idAutor)) {
      alert("ID inválido.");
      return;
    }

    if (!autor) {
      alert("Informe o novo nome do autor.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8086/autor/${idAutor}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: autor }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar autor');
      }

      const resultado = await response.json();
      console.log('Autor atualizado:', resultado);
      alert('Autor atualizado com sucesso!');

      setAutor('');
      setTitulo('');
      setUrlCapa('');
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao atualizar autor:', error.message);
      alert('Erro ao atualizar autor. Verifique os dados e tente novamente.');
    }
  };

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

      {/* Seção de livro */}
      <section className="destaque-livro">
        <div className="imagem-livro">
          <div className="fundo-roxo"></div>
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg"
            alt="Capa do livro A Culpa é das Estrelas"
          />
        </div>
        <div className="texto-livro">
          <h2>A Culpa é das Estrelas</h2>
          <p>
            "A Culpa é das Estrelas", de John Green, é uma tocante história de
            amor entre Hazel e Augustus, dois adolescentes com câncer que se
            conhecem em um grupo de apoio...
          </p>
          <div className="botoes">
            <button className="btn-emprestar">Emprestar</button>
            <img src="./Segmented button.png" alt="" />
          </div>
        </div>
      </section>

      {/* Galeria e formulário */}
      <div className="corpo-dos-livros">
        <h1>LIVROS</h1>

        <button className="btn-cadastrar" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Fechar Formulário' : 'Cadastrar Livro'}
        </button>

        {mostrarFormulario && (
          <form className="formulario-livro" onSubmit={handleCadastro}>
            <input
              type="text"
              placeholder="Título do Livro"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="URL da Capa"
              value={urlCapa}
              onChange={(e) => setUrlCapa(e.target.value)}
              required
            />
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={handleAtualizarAutor}>Editar</button>
            <button type="button" onClick={handleDeletarAutor}>Remover</button>
          </form>
        )}

        {/* Galeria de livros */}
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

      {/* Footer */}
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
};

export default Livros;
