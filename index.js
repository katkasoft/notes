const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const fs = require('fs')

eval(fs.readFileSync('server.cfg').toString())
const sqlite = require('sqlite3')
const { register } = require('module')
const db = new sqlite.Database("db.sqlite3")
db.exec('create table if not exists users (email text, password text)')

app.set('view engine', 'ejs')
app.use('/static', express.static('static'))
const parser = express.urlencoded({extended: false});
app.use(cookieParser())

function error(err, res) {
    console.error(err);
    res.status(500).render('500');
}

app.get('/register', (req, res) => {
    const err = req.query.err
    res.render('auth/register', {err: err})
})

app.post("/api/auth/register", parser, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeat = req.body.repeat;
    if (password !== repeat) {
        res.redirect('/register?err=Passwords+dont+match');
        return;
    }
    let userExists = false;
    try {
        const row = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (row) {
            userExists = true;
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('500');
        return;
    }
    if (userExists) {
        res.redirect('/register?err=Email+already+taken');
        return;
    }
    try {
        await db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password]);
        res.cookie('email', email);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).render('500');
    }
});

app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`)
})