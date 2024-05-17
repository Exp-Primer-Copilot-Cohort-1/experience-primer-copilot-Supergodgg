// Create web server
// npm install express
// npm install body-parser
// npm install ejs

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comment', (req, res) => {
    fs.readFile('data/comment.txt', 'utf8', (err, data) => {
        if (err) {
            res.send('No comment');
        } else {
            res.render('comment', { comments: data });
        }
    });
});

app.post('/comment', (req, res) => {
    const comment = req.body.comment;
    fs.appendFile('data/comment.txt', comment + '\n', (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/comment');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});