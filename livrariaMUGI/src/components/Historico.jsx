import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './historico.css';

const Historico = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    id_emprestimo: '',
    ra_pessoa: '',
    id_livro: '',
    data_emprestimo: '',
    data_devolucao: '',
    historico: ''
  });
  const [busca, setBusca] = useState('');

  useEffect(() => {
    buscarEmprestimos();
  }, []);

  const buscarEmprestimos = () => {
    fetch('http://localhost:8086/emprestimo/listar')
      .then(res => res.json())
      .then(data => {
        if (data.emprestimos) setEmprestimos(data.emprestimos);
      })
      .catch(err => console.error('Erro ao buscar histórico:', err));
  };

  const handleDeletarEmprestimo = async (id_emprestimo) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este empréstimo?');
    if (!confirmar) return;

    try {
      const response = await fetch('http://localhost:8086/emprestimo/deletar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_emprestimo })
      });

      if (response.ok) {
        setEmprestimos(prev => prev.filter(e => e.id_emprestimo !== id_emprestimo));
        // alert('Empréstimo deletado com sucesso!');
      } else {
        const erro = await response.json();
        alert(`Erro ao deletar: ${erro.erro || erro.mensagem}`);
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao tentar excluir o empréstimo.');
    }
  };

  const iniciarEdicao = (emprestimo) => {
    setEditando(emprestimo.id_emprestimo);
    setFormData({ ...emprestimo });
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8086/emprestimo/${formData.id_emprestimo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Empréstimo atualizado com sucesso!');
        setEditando(null);
        buscarEmprestimos();
      } else {
        const erro = await response.json();
        alert(`Erro ao atualizar: ${erro.erro || erro.mensagem}`);
      }
    } catch (erro) {
      console.error('Erro ao editar:', erro);
      alert('Erro ao tentar editar o empréstimo.');
    }
  };

  const emprestimosFiltrados = emprestimos.filter(e =>
    e.ra_pessoa.toString().includes(busca)
  );

  return (
    <div className='tudo'>
      <div className="topo">
        <div></div>
        <div className="acesso">
          <Link to="/login">Login</Link>
          <Link to="/inicio">Início</Link>
          <Link to="/livro">Livro</Link>
          <Link to="/historico">Histórico</Link>
        </div>
      </div>

      <div className="campo-pesquisa">
        <input
          type="text"
          placeholder="Pesquisar por RA da pessoa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={buscarEmprestimos}>Pesquisar</button>
      </div>

      <div className="blocos-livros">
        {emprestimosFiltrados.length === 0 ? (
          <p className="mensagem">Nenhum empréstimo encontrado.</p>
        ) : (
          emprestimosFiltrados.map((item) => (
            <div key={item.id_emprestimo} className="bloco">
              <div className="icones">
                <span
                  className="emoji-icon"
                  role="button"
                  title="Editar"
                  onClick={() => iniciarEdicao(item)}
                >
                  ✎
                </span>
                <span
                  className="emoji-icon"
                  role="button"
                  title="Excluir"
                  onClick={() => handleDeletarEmprestimo(item.id_emprestimo)}
                >
                  ✖
                </span>
              </div>
              <div className="sinopse">
                {editando === item.id_emprestimo ? (
                  <form onSubmit={handleEditar} className="form-editar">
                    <input
                      type="number"
                      value={formData.ra_pessoa}
                      onChange={(e) => setFormData({ ...formData, ra_pessoa: e.target.value })}
                      placeholder="RA Pessoa"
                      required
                    />
                    <input
                      type="number"
                      value={formData.id_livro}
                      onChange={(e) => setFormData({ ...formData, id_livro: e.target.value })}
                      placeholder="ID Livro"
                      required
                    />
                    <input
                      type="date"
                      value={formData.data_emprestimo}
                      onChange={(e) => setFormData({ ...formData, data_emprestimo: e.target.value })}
                      required
                    />
                    <input
                      type="date"
                      value={formData.data_devolucao || ''}
                      onChange={(e) => setFormData({ ...formData, data_devolucao: e.target.value })}
                    />
                    <input
                      type="text"
                      value={formData.historico || ''}
                      onChange={(e) => setFormData({ ...formData, historico: e.target.value })}
                      placeholder="Histórico"
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
                  </form>
                ) : (
                  <>
                    <h3>{item.titulo || 'Livro'}</h3>
                    <p><strong>Usuário:</strong> {item.ra_pessoa}</p>
                    <p><strong>Livro:</strong> {item.id_livro}</p>
                    <p><strong>Empréstimo:</strong> {item.data_emprestimo}</p>
                    <p><strong>Devolução:</strong> {item.data_devolucao || '---'}</p>
                    <p><strong>Histórico:</strong> {item.historico || '---'}</p>
                  </>
                )}
              </div>
            </div>
          ))
        )}
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
    </div>
  );
};

export default Historico;
