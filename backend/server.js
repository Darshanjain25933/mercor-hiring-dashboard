const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const candidates = require('./form-submission.json');

app.use(cors());
app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});