const express = require('express');
const PeopleController = require('./controllers/PeopleController');
const ContactController = require('./controllers/ContactController');
const AddressController = require('./controllers/AddressController');

const routes = express.Router();

// Rotas de Pessoa
routes.get('/people', PeopleController.index);
routes.post('/people', PeopleController.create);
routes.put('/people/:peopleParamsId', PeopleController.update);
routes.delete('/people/:peopleParamsId', PeopleController.delete);

// Rotas de contatos
routes.get('/contact', ContactController.index);
routes.post('/contact', ContactController.create);
routes.put('/contact/:contactId', ContactController.update);
routes.delete('/contact/:contactId', ContactController.delete);

// Rotas de Endereços
routes.get('/address', AddressController.index);
routes.post('/address', AddressController.create);
routes.put('/address/:addressId', AddressController.update);
routes.delete('/address/:addressId', AddressController.delete);


module.exports = routes;