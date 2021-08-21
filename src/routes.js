const { Router, query } = require('express')
const router = new Router()

const mysql = require('mysql2')
const dbconfig = require('./config/db.config')

var connection = mysql.connect({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database:dbconfig.database
})

connection.connect();

connection.connect((err) => {
    if(err) throw err
    console.log('Mysql connected.')
})


router.get('/teste', (req, res) => {
    res.send({ message: 'Connected!'})
})

//Vendas semanais (somatoria de todas as vendas da semana)  DONE 
router.get('/vendas', (req, res) => {
    connection.query(
        'SELECT SUM(itens_vendas.valor_total) FROM `lojatemdetudo`.vendas inner join `lojatemdetudo`.itens_vendas on itens_vendas.fk_venda = vendas.id inner join `lojatemdetudo`.produtos on produtos.id = itens_vendas.fk_produto WHERE vendas.data >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND vendas.data < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})
//Lucro semanal (soma das vendas - soma do custo dos produtos vendidos)
router.get('/lucro', (req, res) => {
    connection.query(
        'SELECT SUM(itens_vendas.valor_total) as valor_total, SUM(produtos.preco_custo) as valor_custo, SUM(itens_vendas.valor_total)- SUM(produtos.preco_custo) as lucro FROM `lojatemdetudo`.vendas inner join `lojatemdetudo`.itens_vendas on itens_vendas.fk_venda = vendas.id inner join `lojatemdetudo`.produtos on produtos.id = itens_vendas.fk_produto WHERE vendas.data >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND vendas.data < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})
//Melhores vendedores (é o vendedor que vendeu maior valor)
router.get('/topVendedor', (req, res) => {
    connection.query(
        '',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})
//Melhores clientes (é o cliente que comprou o maior valor)
router.get('/topCliente', (req, res) => {
    connection.query(
        '',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})
router.get('/venda/:idVenda', (req, res) => {
    connection.query(
        'SELECT vendas.*, itens_vendas.* FROM `lojatemdetudo`.vendas inner join `lojatemdetudo`.itens_vendas on itens_vendas.fk_venda = vendas.id WHERE vendas.id = ?',
        [req.params.idVenda],
        (err, rows, fields) => {
            if (err) throw err;
                if (rows.length <= 0) {
                    return res.status(404).json({ err: 'Venda não encontrada.' });
                }
                return res.status(200).json(rows);
        }
    )
})
//inserir venda 
router.post('/vendas', (req, res) => {
    const venda = req.body
    const values = [
        venda.numero,
        venda.id_cliente,
        venda.data,
    ]

    const {numero, id_cliente, data, fk_produto, quantidade, valor_unitario, valor_total} = venda
    const qry =
        'INSERIR',
    if(!numero || !id_cliente || !data || !fk_produto|| !quantidade) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})

    } else if (valor_unitario  === 0 || !valor_unitario || valor_total === 0 || !valor_total) {
        return res.status(400).json({err: 'Nenhum valor pode ser igual a 0 ou nulo.'})
    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err
            return res.status(201).json({ message: 'Venda cadastrada com sucesso'})
        })
    }
})
//inserir cliente 6  COMO INSERIR JSON PARA BD RELACIONAL
router.post('/clientes', (req, res) => {
    const cliente = req.body
    const values = [
        cliente.nome,
        cliente.endereco,
        cliente.compras,
        cliente.telefone,
    ]

    const {nome, endereco, compras, telefone} = cliente
    const qry = 
    'INSERT INTO `lojatemdetudo`.`clientes` (`nome`, `endereco`, `compras`, `telefone`) VALUES (?,?,?,?)';

    if(!nome || !endereco || !compras || !telefone) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})

    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err;
            return res
              .status(201)
              .json({ message: 'Cliente cadastrado com sucesso.' });
        });
    }
})
//inserir vendedor 7 
router.post('/vendedores', (req, res) => {
    const vendedor = req.body
    const values = [
        vendedor.nome,
    ]

    const {nome, endereco, compras, telefone} = vendedor
    const qry = 
    'INSERT INTO `lojatemdetudo`.`vendedores` (`nome`) VALUES (?)';

    if(!nome || !endereco || !compras || !telefone) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})

    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err;
            return res
              .status(201)
              .json({ message: 'Vendedor cadastrado com sucesso.' });
        });
    }
})
//inserir produto 8 
router.post('/produtos', (req, res) => {
    const produto = req.body
    const values = [
        produto.nome,
        produto.descricao,
        produto.marca,
        produto.fornecedor,
        produto.classificacao,
        produto.preco_custo,
        produto.preco_venda,
        produto.qntd_estoque,
        produto.qntd_loja
    ]

    const {nome, descricao, marca, fornecedor, classificacao, preco_custo, preco_venda, qntd_estoque, qntd_loja} = produto
    const qry = 
    'INSERT INTO `lojatemdetudo`.`produtos` (`nome`, `descricao`, `marca`, `fornecedor`, `classificacao`, `preco_custo`, `preco_venda`, `qntd_estoque`, `qntd_loja`) VALUES (?,?,?,?,?,?,?,?,?)';

    if(!nome || !descricao || !marca || !fornecedor || !classificacao || !preco_custo || !preco_venda || !qntd_estoque || !qntd_loja) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})

    } else if (produto.preco_custo === 0 || produto.preco_venda === 0 || !produto.preco_custo || !produto.preco_venda) {
        return res.status(400).json({err: 'Valor do produto não pode ser nulo ou zero'})
    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err;
            return res
              .status(201)
              .json({ message: 'Produto cadastrado com sucesso.' });
        });
    }
})
//atualizar cliente 9
router.put('/clientes/:idCliente', (req, res) => {
    const cliente = req.body
    const values = [
        cliente.nome,
        cliente.endereco,
        cliente.compras,
        cliente.telefone,
        req.params.idCliente,
    ]

    const {nome, endereco, compras, telefone} = cliente
    const qry = 
    'UPDATE `lojatemdetudo`.`clientes` SET nome = ?, endereco = ?, compras = ?, telefone = ?  WHERE id = ?';

    connection.query(
        'SELECT * FROM `lojatemdetudo`.`clientes` WHERE id = ?',
        [req.params.idCliente],
        (err, rows, fields) => {
            if (rows.length <= 0) {
                if(err) throw err
                return res.status(404).json({ message: 'Cliente não encontrado'})
            } if(!nome || !endereco || !compras || !telefone) {
                    return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})
                } else {
                    connection.query(qry, values, (err, rows, fields) => {
                    if (err) throw err;
                    return res
                      .status(201)
                      .json({ message: 'Cliente cadastrado com sucesso.' });
                });
            }
        }
    )
})
//atualizar produto 10
router.put('/produtos/:idProduto', (req, res) => {
    const produto = req.body
    const values = [
        produto.nome,
        produto.descricao,
        produto.marca,
        produto.fornecedor,
        produto.classificacao,
        produto.preco_custo,
        produto.preco_venda,
        produto.qntd_estoque,
        produto.qntd_loja,
        req.params.idProduto
    ]

    const {nome, descricao, marca, fornecedor, classificacao, preco_custo, preco_venda, qntd_estoque, qntd_loja} = produto
    const qry = 
    'UPDATE `lojatemdetudo`.`produtos` SET nome = ?, descricao = ?, marca = ?, fornecedor = ?, classificacao = ?, preco_custo = ?, preco_venda = ?, qntd_estoque = ?, qntd_loja = ? WHERE id = ?'

    connection.query(
        'SELECT * FROM `lojatemdetudo`.`produtos` WHERE id= ?',
        [req.params.idProduto],
        (err, rows, fields) => {
          if (rows.length <= 0) {
            if (err) throw err;
            return res.status(404).json({ message: 'Produto não encontrado.' });
          } else {
            if (!nome || !descricao || !marca || !fornecedor || !classificacao || !preco_custo || !preco_venda || !qntd_estoque || !qntd_loja) {
              return res
                .status(400)
                .json({ err: 'Preenchimento incorreto, cheque os campos.' });
            } else if (produto.preco === 0 || !produto.preco) {
              return res
                .status(400)
                .json({ err: 'O preço do produto não pode ser 0.' });
            } else {
              connection.query(qry, values, (err, rows, fields) => {
                if (err) throw err;
                return res
                  .status(200)
                  .json({ message: 'Produto editado com sucesso.' });
              });
            }
          }
        },
      );
})

module.exports = router