INSERT INTO `lojatemdetudo`.`clientes` (`nome`, `endereco`, `compras`, `telefone`) 
VALUES ('Marcela', 'R. Cônego Eugênio Leite, 972-1246 - Pinheiros', '5', '(11)123456'),
('Antonio', 'R. Fidalga, 209-01 - Pinheiros', '2', '(11)23456789'),
('Cláudia', 'R. Dr. Virgílio de Carvalho Pinto, 443-227 - Pinheiros', '3', '(11)345678');

INSERT INTO `lojatemdetudo`.`produtos` (`nome`, `descricao`, `marca`, `fornecedor`, `classificacao`, `preco_custo`, `preco_venda`, `qntd_estoque`, `qntd_loja`) 
VALUES ('caderno', 'caderno 10 matérias com capa dura', 'cadernos 10', 'papelaria sr josé', 'papelaria', '12.50', '15', '4', '1'),
('conjunto para pintura', 'kit com tintas e pincéis para pintura', 'Cores Vivas', 'papelaria sr josé', 'papelaria', '19.9', '25', '5', '5'),
('vaso de flores', 'Vaso amarelo com flores atificiais vermelhas', 'Janaina Flores', 'floricultura da Janaina', 'decoracao', '25', '33.9', '1', '2');

INSERT INTO `lojatemdetudo`.`vendedores` (`nome`)
VALUES ('Celeste'), 
('Leila'), 
('Luiz Claudio');  

INSERT INTO `lojatemdetudo`.`vendas` (`id_cliente`, `data`, `fk_vendedor`)
VALUES ('1', '2020-02-07', '1'),
('2','2020-03-07','2'),
('3','2020-04-07','3'),
('1','2020-05-07','2');

INSERT INTO `lojatemdetudo`.`itens_vendas` (`fk_venda`, `fk_produto`, `quantidade`, `valor_unitario`, `valor_total`)
VALUES 
('1','1','2','15','30'),
('2','1','1','15','15'),
('2','2','1','25','25'),
('3','3','1','33.90','33.90'),
('3','2','1','25','25');