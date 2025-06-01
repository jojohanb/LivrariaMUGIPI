import React from "react";
import "./login.css";
import cadeado from '../assets/cadeado (1).png'
import email from '../assets/gmail (1).png'
import imagem_6 from '../assets/image 6 (1).png'

export default function Login() {
  return (
    <div>
      {/* Topo */}
      <div className="topo">
        <div>
          {/* <img src="/Captura de tela 2025-03-31 113630.png" alt="Logo" /> */}
        </div>
        <div className="acesso">
          <a href="./login">Login</a>
          <a href="./inicio">Início</a>
          <a href="./livro">Livro</a>
          <a href="./historico">Histórico</a>
        </div>
      </div>

      {/* Formulário e imagem lado a lado */}
      <div className="forms-img">
        <div className="formulario">
          <h1>Faça seu login</h1>

          <div className="espaco">
            <label htmlFor="email">E-mail</label>
            <div className="campos">
              <input
                id="email"
                type="email"
                placeholder="Entre com um e-mail válido!"
              />
              <img src={email} alt="Ícone e-mail" />
            </div>
          </div>

          <div className="espaco">
            <label htmlFor="senha">Senha</label>
            <div className="campos">
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
              />
              <img src={cadeado} alt="Ícone senha" />
            </div>
          </div>

          <p id="esqueceu">Esqueceu sua senha?</p>

          <div className="espaco_botoes">
            <button id="botao1">Login</button>
            <button id="botao2">Cadastro</button>
          </div>
        </div>

        <div className="imagem-lateral">
          <img
            id="img-maior"
            src={imagem_6}
            alt="Imagem ilustrativa"
          />
        </div>
      </div>
    </div>
  );
}
