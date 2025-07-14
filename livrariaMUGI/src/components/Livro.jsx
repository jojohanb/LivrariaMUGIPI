import React, { useState, useEffect } from 'react';
import './livros.css';

const Livros = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioEmprestimo, setMostrarFormularioEmprestimo] = useState(false);
  const [livros, setLivros] = useState([]);

  const [isbn, setIsbn] = useState('');
  const [titulo, setTitulo] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [idEditora, setIdEditora] = useState('');
  const [qtdDisponivel, setQtdDisponivel] = useState('');
  const [edicao, setEdicao] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [urlCapa, setUrlCapa] = useState('');

  // Formulário empréstimo
  const [raPessoa, setRaPessoa] = useState('');
  const [idLivroEmprestimo, setIdLivroEmprestimo] = useState('');
  const [dataEmprestimo, setDataEmprestimo] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [historico, setHistorico] = useState('');

  useEffect(() => {
    buscarLivros();
  }, []);

  const buscarLivros = () => {
    fetch('http://localhost:8086/livro/listar')
      .then(res => res.json())
      .then(data => {
        if (data.livros) setLivros(data.livros);
      })
      .catch(err => console.error('Erro ao buscar livros:', err));
  };

  const handleDeletarLivro = async (id_livro) => {
    if (!window.confirm('Tem certeza que deseja deletar este livro?')) return;

    try {
      const response = await fetch('http://localhost:8086/livro/deletar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_livro }),
      });

      if (response.ok) {
        setLivros(prev => prev.filter(livro => livro.id_livro !== id_livro));
      } else {
        const erro = await response.json();
        alert(`Erro: ${erro.erro || erro.mensagem}`);
      }
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      alert('Erro ao tentar deletar o livro.');
    }
  };

  const handleCadastrarLivro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8086/livro/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isbn,
          titulo,
          id_autor: parseInt(idAutor),
          id_editora: parseInt(idEditora),
          qtd_disponivel: parseInt(qtdDisponivel),
          edicao,
          id_categoria: parseInt(idCategoria),
          id_subcategoria: parseInt(idSubcategoria),
          url_capa: urlCapa,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Livro cadastrado com sucesso!');
        setLivros(prev => [...prev, data.livro]);
        // Limpa campos
        setIsbn('');
        setTitulo('');
        setIdAutor('');
        setIdEditora('');
        setQtdDisponivel('');
        setEdicao('');
        setIdCategoria('');
        setIdSubcategoria('');
        setUrlCapa('');
        setMostrarFormulario(false);
      } else {
        alert(`Erro: ${data.erro || 'Erro ao cadastrar livro'}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  const handleEmprestar = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8086/emprestimo/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ra_pessoa: parseInt(raPessoa),
          id_livro: parseInt(idLivroEmprestimo),
          data_emprestimo: dataEmprestimo,
          data_devolucao: dataDevolucao || null,
          historico: historico || null,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Empréstimo registrado com sucesso!');
        setRaPessoa('');
        setIdLivroEmprestimo('');
        setDataEmprestimo('');
        setDataDevolucao('');
        setHistorico('');
        setMostrarFormularioEmprestimo(false);
      } else {
        alert(`Erro: ${data.erro || data.error || 'Erro ao registrar empréstimo.'}`);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <div className="topo">
        <div></div>
        <div className="acesso">
          <a href="./login">Login</a>
          <a href="./inicio">Início</a>
          <a href="./livro">Livro</a>
          <a href="./historico">Histórico</a>
        </div>
      </div>

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
            "A Culpa é das Estrelas", de John Green, é uma tocante história de amor entre Hazel e Augustus, dois adolescentes com câncer...
          </p>
          <div className="botoes">
            <button className="btn-emprestar" onClick={() => setMostrarFormularioEmprestimo(!mostrarFormularioEmprestimo)}>
              {mostrarFormularioEmprestimo ? 'Fechar Empréstimo' : 'Emprestar'}
            </button>
            <img src="./Segmented button.png" alt="" />
          </div>
        </div>
      </section>

      {mostrarFormularioEmprestimo && (
        <form className="formulario-emprestimo" onSubmit={handleEmprestar}>
          <h3>Formulário de Empréstimo</h3>
          <input type="number" placeholder="RA da Pessoa" value={raPessoa} onChange={e => setRaPessoa(e.target.value)} required />
          <input type="number" placeholder="ID do Livro" value={idLivroEmprestimo} onChange={e => setIdLivroEmprestimo(e.target.value)} required />
          <input type="date" value={dataEmprestimo} onChange={e => setDataEmprestimo(e.target.value)} required />
          <input type="date" value={dataDevolucao} onChange={e => setDataDevolucao(e.target.value)} />
          <input type="text" placeholder="Histórico" value={historico} onChange={e => setHistorico(e.target.value)} />
          <button type="submit">Enviar</button>
        </form>
      )}

      <div className="corpo-dos-livros">
        <h1>LIVROS</h1>

        <button className="btn-cadastrar" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Fechar Formulário' : 'Cadastrar Livro'}
        </button>

        {mostrarFormulario && (
          <form className="formulario-livro" onSubmit={handleCadastrarLivro}>
            <input type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} required />
            <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
            <input type="text" placeholder="ID do autor" value={idAutor} onChange={e => setIdAutor(e.target.value)} required />
            <input type="number" placeholder="ID da Editora" value={idEditora} onChange={e => setIdEditora(e.target.value)} required />
            <input type="number" placeholder="Quantidade Disponível" value={qtdDisponivel} onChange={e => setQtdDisponivel(e.target.value)} required />
            <input type="text" placeholder="Edição" value={edicao} onChange={e => setEdicao(e.target.value)} />
            <input type="number" placeholder="ID da Categoria" value={idCategoria} onChange={e => setIdCategoria(e.target.value)} required />
            <input type="number" placeholder="ID da Subcategoria" value={idSubcategoria} onChange={e => setIdSubcategoria(e.target.value)} required />
            <input type="url" placeholder="URL da Capa" value={urlCapa} onChange={e => setUrlCapa(e.target.value)} required />
            <button type="submit">Cadastrar Livro</button>
          </form>
        )}

        <div className="galeria-livros">
          {livros.map(livro => (
            <div key={livro.id_livro} className="livro-item">
              <img src={livro.url_capa} alt={livro.titulo} />
              <button className="btn-deletar" onClick={() => handleDeletarLivro(livro.id_livro)} title="Deletar livro">
                🗑️
              </button>
            </div>
          ))}
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
};

export default Livros;
