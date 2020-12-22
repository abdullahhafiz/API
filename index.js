const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello world' });
})
app.listen(9090);

