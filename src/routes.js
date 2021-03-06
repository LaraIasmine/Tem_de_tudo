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


router.get('/vendas', (req, res) => {
    connection.query(
        'SELECT SUM(itens_vendas.valor_total) as total_vendas_semana FROM `lojatemdetudo`.`vendas` inner join `lojatemdetudo`.`itens_vendas` on `itens_vendas`.`fk_venda` = `vendas`.`id` inner join `lojatemdetudo`.`produtos` on `produtos`.`id` = `itens_vendas`.`fk_produto` WHERE vendas.data >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND vendas.data < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY',
        
        (err, rows, fields) => {
            if(err) throw err;
            if (rows.length <= 0) {
                return res.status(404).json({ err: 'Não há vendas cadastradas na última semana.' });
            }
            return res.status(200).json(rows);
        }
    )
})

router.get('/lucro', (req, res) => {
    connection.query(
        'SELECT SUM(itens_vendas.valor_total) as valor_total, SUM(produtos.preco_custo) as valor_custo, SUM(itens_vendas.valor_total)- SUM(produtos.preco_custo) as lucro FROM `lojatemdetudo`.vendas inner join `lojatemdetudo`.itens_vendas on itens_vendas.fk_venda = vendas.id inner join `lojatemdetudo`.produtos on produtos.id = itens_vendas.fk_produto WHERE vendas.data >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND vendas.data < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})

router.get('/topVendedor', (req, res) => {
    connection.query(
        'SELECT vendedores.nome, COUNT(*) as total_vendas FROM `lojatemdetudo`.vendas inner join `lojatemdetudo`.vendedores on vendedores.id = vendas.fk_vendedor GROUP BY vendedores.id ORDER BY total_vendas DESC LIMIT 1',
        (err, rows, fields) => {
            if(err) throw err;
            res.status(200).json(rows)
        }
    )
})

router.get('/topCliente', (req, res) => {
    connection.query(
        'SELECT clientes.nome, MAX(clientes.compras) as total_compras FROM `lojatemdetudo`.clientes GROUP BY clientes.id ORDER BY total_compras DESC LIMIT 1',
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
 
router.post('/vendas', (req, res) => {
    const venda = req.body
    const values = [
        venda.numero,
        venda.id_cliente,
        venda.data,
        venda.fk_vendedor,
    ]

    const {numero, id_cliente, data, fk_vendedor} = venda
    const qry =
        'INSERT INTO `lojatemdetudo`.`vendas` (`id_cliente`, `data`, `fk_vendedor`) values (?,?,?,?)';
    if (!numero || !id_cliente || !data || !fk_vendedor) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})

    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err
            return res.status(201).json({ message: 'Venda cadastrada com sucesso'})
        })
    }
})
router.put('/atualizarCliente/:idCliente', (req, res) => {
    const values = [
        req.params.idCliente
    ]

    const qry = 
    ' UPDATE `lojatemdetudo`.`clientes` SET compras = compras + 1  WHERE id = ?';

    connection.query (
        'SELECT * FROM  `lojatemdetudo`.`clientes` WHERE id = ?',
        [req.params.idCliente],
        (err, rows, fields) => {
            if ( rows.length <= 0) {
                if (err) throw err
                return res.status(404).json({ message: 'Cliente não encontrado.' })
            } else {
                connection.query(qry, values, (err, rows, fields) => {
                    if (err) throw err;
                    return res
                      .status(200)
                      .json({ message: 'Compras do cliente atualizadas com sucesso.' });
                });
            }
        }
    )

})

router.post('/itensVenda', (req, res) => {
    const itens_venda = req.body
    const values = [
        itens_venda.fk_venda,
        itens_venda.fk_produto,
        itens_venda.quantidade,
        itens_venda.valor_unitario,
        itens_venda.valor_total,
    ]

    const {fk_venda, fk_produto, quantidade, valor_unitario, valor_total} = itens_venda
    const qry =
        'INSERT INTO `lojatemdetudo`.`itens_vendas` (`fk_venda`, `fk_produto`, `quantidade`, `valor_unitario`, `valor_total` VALUES (?, ?, ?, ?, ?)';

    if (!fk_venda || !fk_produto || !quantidade || !valor_unitario || !valor_total ) {
        return res.status(400).json({err: 'Preencimento incorreto, cheque os campos.'})
    } else if (itens_venda.valor_unitario === 0 || itens_venda.valor_total === 0 || !itens_venda.valor_unitario || !itens_venda.valor_total) {
            return res.status(400).json({ err: 'Os valores totais e unitários não podem ser nulos ou R$ 0.' })
    } else {
        connection.query(qry, values, (err, rows, fields) => {
            if (err) throw err
            return res.status(201).json({ message: 'Itens cadastrados com sucesso'})
        })
    }
})

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