const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json({
    limit: "1mb"
}));
require('dotenv').config();

const port = process.env.PORT || 3000;

const updateGrades = require('./updateGrades');

app.get('/update', (req, res) => {
    updateGrades(process.env.ASPEN_USERNAME, process.env.ASPEN_PASSWORD, "trigger@applet.ifttt.com", "1oXrBcykqODQyuacMJp1GDt2H_gsFsC2NewVQV9z0or0")
        .then(changes => res.send(JSON.stringify(changes)))
        .catch(err => console.log(err));
});

app.post('/update', (req, res) => {

    updateGrades(req.body.username, req.body.password, req.body.email_address, req.body.spreadsheetId)
        .then(changes => res.send(JSON.stringify(changes)))
        .catch(err => console.log(err));


    /* POST request syntax:
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch("/update", options)

    */


});



// app.get('/', (req, res) => res.send('Ask Brayden for help setting up'));
// app.get('/iaskedbrayden', (req, res) => res.send('iaskedbrayden'));

app.listen(port)