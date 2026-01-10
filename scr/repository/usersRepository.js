const db = require("../config/db");

const userRepository = {
  
  async create(usuario){
    try {
      const {
        email,
        nomeCompleto,
        idade,
        genero,
        enderecoCompleto,
        telefone,
        login,
        senha,
        
      } = usuario;

      const [resultado] = await db.query(
        "INSERT INTO users (genero, idade, nome_completo, email, endereco_completo, telefone, usuario, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [genero, idade, nomeCompleto, email, enderecoCompleto, telefone, login ,senha]
      );
      return {id : resultado.insertId}
    } catch (error) {
      console.error("ERRO AO CRIAR USUARIO -> ", error.message);
      throw new Error("ERRO AO TENTAR CRIAR USUARIO NO BANCO DE DADOS");
    }  
  },

  async update(usuario){
    try {
      const {
        email,
        nomeCompleto,
        idade,
        genero,
        enderecoCompleto,
        telefone,
        login,
        senha,
        
      } = usuario;
      
      const[resultado] = await db.query(
        `UPDATE users SET
          nome_completo = ?, 
          idade = ?,
          genero = ?,
          endereco_completo = ?,
          telefone = ?,
          usuario = ?,
          senha = ?
        WHERE email = ?`,
        [nomeCompleto, idade, genero, enderecoCompleto, telefone, login, senha, email]
      );
      return {update: resultado.affectedRows};  
      
      
    } catch (error) {
      console.error("ERRO AO ATUALIZAR O USUARIO -> ", error.message);
      throw new Error("ERRO AO ATUALIZAR AS INFORMACOES NO BANCO DE DADOS");
    }
  },

  async verificaEmail(email){
    try {
      const [existe] = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );
      return existe.length > 0;
    } catch (err) {
      console.error("ERRO VERIFICANDO EMAIL:", err.message);
      throw new Error("ERRO AO VERIFICAR SE O EMAIL EXISTE NO BANCO DE DADOS");
    }
  }
};


module.exports = userRepository;