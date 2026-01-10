CREATE DATABASE api_random_user
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE api_random_user;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    genero ENUM('male', 'female', 'other') NOT NULL,
    idade INT NOT NULL CHECK (idade >= 0),

    nome_completo VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,

    endereco_completo VARCHAR(200) NOT NULL,
    telefone VARCHAR(200) NOT NULL,
    usuario VARCHAR(200) NOT NULL,
    senha VARCHAR(200) not null

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);