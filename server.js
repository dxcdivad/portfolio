const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

const apikey = process.env.sendgrid_api_key;
sgMail.setApiKey(apikey);


const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));


app.get('/', (req, res) => {
    res.render('index');
});


app.post('/thanks', (req, res) => {
    const msg = {
        to: 'dxcdivad@gmail.com',
        from: req.body.emailArea,
        subject: req.body.nameArea,
        text: req.body.textArea,
        html: req.body.textArea     
        }
    sgMail.send(msg);
    res.render('thanks', msg)
}); 


app.listen(process.env.PORT || 8080, () => {
    console.log('listening at https://localhost:8080')
});