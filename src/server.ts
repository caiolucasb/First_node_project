import 'reflect-metadata';

import express from 'express';
import routes from './routes/index'
import bodyParser from 'body-parser';

import './database';

const app = express();

app.use(bodyParser.json())

app.use(routes);


app.listen(3333, () => {
    console.log("Server rodando na porta 3333")
})
