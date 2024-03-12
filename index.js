const express = require('express');
const mysql = require('mysql2');
const body_parser = require('body-parser');

const app = express();

require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vini4513',
    database: 'userdb'
})

connection.connect((err)=>{
    if(err) throw err;
    console.log('Conectado ao Banco de Dados');
})

app.use(body_parser.json());

app.post('/users', (req, res)=>{
    const {name, email} = req.body;
    const insert_user = `INSERT INTO users (name, email) VALUES (?, ?);`

    connection.query(insert_user, [name, email], (err, results)=>{
        if(err) throw err;
        res.send('Usuário criado com sucesso');
    });
});

app.get('/users', (req, res)=>{
    connection.query('SELECT * FROM users', (err, results)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.get('/users/:id', (req, res)=>{
    const user_id = req.params.id;
    const select_user = `SELECT * FROM users WHERE id = ?;`
    connection.query(select_user, [user_id], (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.listen(process.env.DB_PORT,()=>{
    console.log(`Servidor rodando na porta ${process.env.DB_PORT}`);
})

module.exports = app;