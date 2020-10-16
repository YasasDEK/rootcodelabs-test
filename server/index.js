const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rootcodelabs'
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM posts;"
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
})

app.get('/api/getpost/:id', (req,res) => {
    const sqlSelect = "SELECT * FROM posts WHERE id = ?;"
    db.query(sqlSelect,[req.params.id], (err,result) => {
        res.send(result);
    });
})

app.get('/api/comments/:id', (req,res) => {
    const sqlSelect = "SELECT * FROM comments where id = ?;"
    db.query(sqlSelect,[req.params.id], (err,result) => {
        res.send(result);
    });
})

app.post('/api/insert', (req,res) => {
    const title = req.body.title
    const description = req.body.description

    const sqlInsert = "INSERT INTO posts (title, description) VALUES (?,?);"
    db.query(sqlInsert, [title, description], (err,result) => {
        console.log(result);
    })
});

app.post('/api/insertcomment', (req,res) => {
    const id = req.body.id
    const comment = req.body.comment

    const sqlInsert = "INSERT INTO comments (id, comment) VALUES (?,?);"
    db.query(sqlInsert, [id, comment], (err,result) => {
        console.log(result);
    })
});

app.listen(3001, () => {
    console.log('running on port 3001')
})