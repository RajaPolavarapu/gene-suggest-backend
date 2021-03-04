const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const { connection, prepareQuery, errorResult, successResult } = require("./helpers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = 3001;

connection.connect((err) => {
    if (err) {
        return null;
    }
});

app.get('/gene_suggest', (req, res) => {

    const sqlQuery = prepareQuery(req.query);

    try {
        connection.query(sqlQuery, (err, result, fields) => {
            if (err) {
                res.send(errorResult({ err, result }));
                return null;
            }
            if (result) {
                const simplifiedResult = result.map(d => {
                    return d.display_label;
                });
                res.send(successResult({ result: simplifiedResult }));
                return null;
            }
        });
    } catch (e) {
        res.send(errorResult({ err, result }));
        return null;
    }
});

app.listen(port, () => {
    console.log(`End Point Listening at http://localhost:${port}`)
})