CREATE DATABASE  IF NOT EXISTS `lojatemdetudo`;
USE `lojatemdetudo`;

--- Criando tabela de produtos ---
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `lojatemdetudo`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  `fornecedor` VARCHAR(45) NOT NULL,
  `classificacao` VARCHAR(25) NOT NULL,
  `preco_custo` FLOAT NOT NULL,
  `preco_venda` FLOAT NOT NULL,
  `qntd_estoque` INT NOT NULL,
  `qntd_loja` INT NOT NULL,
  PRIMARY KEY (`id`));

  --- Criando tabela de clientes ---
DROP TABLE IF EXISTS `clientes`;
  CREATE TABLE `lojatemdetudo`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `endereco` VARCHAR(150) NOT NULL,
  `compras` INT NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`id`));

--- Criação da tabela de vendas ---
DROP TABLE IF EXISTS `vendas`;
CREATE TABLE `lojatemdetudo`.`vendas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `data` DATE NOT NULL,
  `fk_vendedor` INT NOT NULL,
  PRIMARY KEY (`id`));

  --- Criação tabela de Itens da venda ---
  DROP TABLE IF EXISTS `itens_vendas`;
  CREATE TABLE `lojatemdetudo`.`itens_vendas` (
  `fk_venda` INT NOT NULL,
  `fk_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `valor_unitario` FLOAT NOT NULL,
  `valor_total` VARCHAR(45) NOT NULL
  );

  -- Criação da tabela de Vendedores ---
  DROP TABLE IF EXISTS `vendedores`;
  CREATE TABLE `lojatemdetudo`.`vendedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));



--- Foreign Keys ---
 --- Vendedores ---
  ALTER TABLE `lojatemdetudo`.`vendas` 
ADD INDEX `fk_vendedor_idx` (`fk_vendedor` ASC) VISIBLE;
;
ALTER TABLE `lojatemdetudo`.`vendas` 
ADD CONSTRAINT `fk_vendedor`
  FOREIGN KEY (`fk_vendedor`)
  REFERENCES `lojatemdetudo`.`vendedores` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

--- vendas ---
  ALTER TABLE `lojatemdetudo`.`itens_vendas` 
ADD CONSTRAINT `fk_venda`
  FOREIGN KEY (`fk_venda`)
  REFERENCES `lojatemdetudo`.`vendas` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

--- produtos ---
ALTER TABLE `lojatemdetudo`.`itens_vendas` 
ADD CONSTRAINT `fk_produtos`
  FOREIGN KEY (`fk_produto`)
  REFERENCES `lojatemdetudo`.`produtos` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

