const express = require('express')
const app = express()

const sqlite = require('sqlite3')
const db = new sqlite.Database("db.sqlite3")
db.exec('create table if not exists users (email text, password text)')

app.set('view engine', 'ejs')
app.use('/static', express.static('static'))
const parser = express.urlencoded({extended: false});

app.get('/register', (req, res) => {
    const err = req.query.err
    res.render('auth/register', {err: err})
})

app.post("/api/auth/register", parser, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeat = req.body.repeat;
    if (password !== repeat) {
        res.redirect('/register?err=Passwords+don\'t+match');
        return;
    }

    db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], function(err) {
        if (err) {
            console.error(err);
            res.status(500).render('500');
        } else {
            res.redirect('/');
        }
    });
})

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000")
})