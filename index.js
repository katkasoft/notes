const HOST = 'localhost'
const PORT = 8000
const express = require('express')
const app = express()
const { Client } = require('pg')

const db = new Client({
    user: 'katka',
    host: 'localhost',
    database: 'notes',
    password: '2011',
    port: 5432
})
db.connect()
const usersQuery = 'CREATE TABLE IF NOT EXISTS users (email varchar, password varchar)'
db.query(usersQuery, (err, res) => {
    if (err) throw new Error(err)
})

app.use('/static', express.static(__dirname + '/static'))
app.set('view engine', 'ejs')

app.get('/auth/login', (req, res) => {
    res.render('auth/register')
})

app.get('/api/auth/exist', (req, res) => {
    db.query(`SELECT * FROM USERS WHERE email='${req.query.email}`, (err, res) => {
        if (err) {
            res.send('error')
            return
        }
        if (res.rows) res.send('true')
        else res.send('false')
    })
})

app.get('/api/auth/register', (req, res) => {
    
})

app.listen(PORT, HOST, () => console.log(`Server listening at http://${HOST}:${PORT}`))