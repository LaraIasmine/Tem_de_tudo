const { Router } = require('express')
const router = new Router()

const mysql = require('mysql2')
const dbconfig = require('./config/db.config')

var connection = mysql.connect({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
})

connection.connect();

connection.connect((err) => {
    if(err) throw err
    console.log('Mysql connected.')
})


router.get('/message', (req, res) => {
    res.send({ message: 'Connected!'})
})
//Vendas semanais (somatoria de todas as vendas da semana)

//Lucro semanal (soma das vendas - soma do custo dos produtos vendidos)

//Melhores vendedores (é o vendedor que vendeu maior valor)

//Melhores clientes (é o cliente que comprou o maior valor)

//inserir venda

//inserir vendedor

//inserir cliente

//inserir produto 

//inserir endereço 

//remover venda

//remover vendedor

//remover cliente

//remover cliente

//atualizar produto 

//atualizar cliente 

module.exports = router