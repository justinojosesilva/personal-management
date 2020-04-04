const express = require('express');
const routes = require('./routes');


// Criando a aplicação
const app = express();

app.use(express.json());

app.use(routes);

// Ficar ouvindo a porta 3333
app.listen(3333);