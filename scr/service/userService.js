const { load } = require("../Controller/UserController");
const usersRepository = require("../repository/usersRepository");


const userService = {
  async load() {
    try {
      const usuariosApi = await buscaApi(150);
      let contIgnorados = 0;
      let contAtualizados = 0;
      let contAdicionados = 0;
      let contErros = 0;
      for (const rUsuarios of usuariosApi.results) {
        try {
          let usuario = {
            email: rUsuarios.email,
            nomeCompleto: `${rUsuarios.name.first} ${rUsuarios.name.last}`,
            idade: rUsuarios.dob.age,
            genero: rUsuarios.gender,
            enderecoCompleto: `${rUsuarios.location.street.name}, ${rUsuarios.location.street.number} - ${rUsuarios.location.city} / ${rUsuarios.location.state} - ${rUsuarios.location.country}`,
            telefone: rUsuarios.phone,
            login: rUsuarios.login.username,
            senha: rUsuarios.login.md5
          };

          if (usuario.idade < 40) {
            contIgnorados++;
            continue;
          }

          const emailCadastrado = await usersRepository.verificaEmail(usuario.email);
          if (emailCadastrado) {
            await usersRepository.update(usuario);
            contAtualizados++;
          } else {
            await usersRepository.create(usuario);
            contAdicionados++;
          }

        } catch (error) {
          contErros++;
          console.error(`ERRO AO PROCESSAR USUARIO ${rUsuarios.email}:`, error.message);
          throw new Error("ERRO AO BUSCAR OS USUARIOS");
        }
      }
      return {
        totalProcessados: usuariosApi.results.length,
        registros: {
          Ignorados: contIgnorados,
          Atualizados: contAtualizados,
          Adicionados: contAdicionados,
          Erros: contErros,
        },
      };
    } catch (error) {
      console.error("ERRO GERAL NO LOAD", error.message);
      throw new Error("ERRO AO BUSCAR OS USUARIOS");
    }
  }

};

const sleep = (ms) => new Promise(results => setTimeout(results, ms));
const buscaApi = async (limite = 150) => {

  try {
    const limiteUsuario = Math.min(limite, 150);
    await sleep(5000);

    const resultadoApi = await fetch(`https://randomuser.me/api/?results=${limiteUsuario}`);
    if (!resultadoApi.ok) throw new Error(`http ${resultadoApi.status}`);

    return await resultadoApi.json();
  } catch (err) {
    console.log("Erro: ", err);
    throw err;
  }

};

module.exports = userService;