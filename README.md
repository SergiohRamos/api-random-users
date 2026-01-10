# Consulta Usuários RH

API de gerenciamento de usuários para um sistema de RH, com cadastro de endereços e importação de dados de usuários aleatórios através da API [Random User](https://randomuser.me/).

---

## Pré-requisitos

- MySQL versão 8.0 ou superior
- Node.js instalado
- Criar arquivo `.env` na raiz do projeto com os seguintes dados:

```dotenv
DB_HOST=seu_host
DB_PORT=sua_porta
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=api_random_user
```

> O arquivo `.env` será usado na configuração do banco (`scr/config/db.js`).

---

## Instalação e execução

1. Configure o banco de dados:

Execute o arquivo `Db.sql` no seu MySQL

2. Instale as dependências:

```bash
npm install
```

---

3. Execute o projeto:

```bash
node index.js
```

A partir desse momento o serviço estara rodando. Para executar a carga de dados, será necessário executar o post `/load` do cURL abaixo

```bash
curl --location --request POST ':3000/load'
```

---

## Estrutura do Projeto

```bash
Api-Usuarios-RH/
│
├─ scr/
│  ├─ controller/
│  │  └─ UserController.js
│  ├─ repository/
│  │  ├─ userRepository.js
│  ├─ service/
│  │  └─ userService.js
│  ├─ config/
│  │  └─ db.js
│  └─ app.js
├─ node_modules/
├─ .env
├─ package.json
├─ index.js
└─ README.md
```

---

# Funcionalidades

- Cadastro de usuários no banco de dados.
- Cadastro de endereços associados a usuários.
- Importação de usuários aleatórios da API randomuser.me.
- Validação de idade (usuários menores de 18 anos são ignorados).
- Atualização automática de usuários existentes.
- Contagem de usuários processados, ignorados, adicionados, atualizados e com erro.
- Tratamento de erros robusto para banco de dados e API externa.

# Tratamento de erros

- Cada operação de banco é envolvida em try/catch para capturar falhas.
- Usuários com erro de cadastro não interrompem o processamento geral.
- Erros de conexão ou da API externa são logados com mensagens detalhadas.
