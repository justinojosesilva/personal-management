const express = require('express');
const PeopleController = require('./controllers/PeopleController');
const ContactController = require('./controllers/ContactController');

const routes = express.Router();

// Rotas de Pessoa
routes.get('/people', PeopleController.index);
routes.post('/people', PeopleController.create);

// Rotas de contatos
routes.get('/contact', ContactController.index);
routes.post('/contact', ContactController.create);
routes.put('/contact/:contactId', ContactController.update);
routes.delete('/contact/:contactId', ContactController.delete);

module.exports = routes;