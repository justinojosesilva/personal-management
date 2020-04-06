const express = require('express');
const PeopleController = require('./controllers/PeopleController');
const ContactController = require('./controllers/ContactController');
const GoalController = require('./controllers/GoalController');
const AddressController = require('./controllers/AddressController');
const LanguageController = require('./controllers/LanguageController');
const CourseController = require('./controllers/CourseController');
const KnowledgeController = require('./controllers/KnowledgeController');
const ProfessionalExperienceController = require('./controllers/ProfessionalExperienceCoontroller');
const ProfessionalAssignmentController = require('./controllers/ProfessionalAssignmentController');

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

// Rotas de Objetivos
routes.get('/goal', GoalController.index);
routes.post('/goal', GoalController.create);
routes.put('/goal/:goalId', GoalController.update);
routes.delete('/goal/:goalId', GoalController.delete);

// Rotas de Endereços
routes.get('/address', AddressController.index);
routes.post('/address', AddressController.create);
routes.put('/address/:addressId', AddressController.update);
routes.delete('/address/:addressId', AddressController.delete);

// Rotas de Idiomas
routes.get('/language', LanguageController.index);
routes.post('/language', LanguageController.create);
routes.put('/language/:languageId', LanguageController.update);
routes.delete('/language/:languageId', LanguageController.delete);

// Rotas de Cursos
routes.get('/course', CourseController.index);
routes.post('/course', CourseController.create);
routes.put('/course/:courseId', CourseController.update);
routes.delete('/course/:courseId', CourseController.delete);

// Rotas de Conhecimentos
routes.get('/knowledge', KnowledgeController.index);
routes.post('/knowledge', KnowledgeController.create);
routes.put('/knowledge/:knowledgeId', KnowledgeController.update);
routes.delete('/knowledge/:knowledgeId', KnowledgeController.delete);

// Rotas de Experiências
routes.get('/experience', ProfessionalExperienceController.index);
routes.post('/experience', ProfessionalExperienceController.create);
routes.put('/experience/:experienceId', ProfessionalExperienceController.update);
routes.delete('/experience/:experienceId', ProfessionalExperienceController.delete);

// Rotas de Atrinbuições das Experiências
routes.get('/assignment/:experience', ProfessionalAssignmentController.index);
routes.post('/assignment/:experience', ProfessionalAssignmentController.create);
routes.put('/assignment/:experienceId/:assignmentId', ProfessionalAssignmentController.update);
routes.delete('/assignment/:experienceId/:assignmentId', ProfessionalAssignmentController.delete);


module.exports = routes;