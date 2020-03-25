const express = require('express');

const loginController = require('./controllers/loginController');

const ongController = require('./controllers/ongsControler');

const incidentsController = require('./controllers/incidentsController');

const routes = express.Router();

routes.post('/login', loginController.loginOng);

routes.post('/ong', ongController.addOng);

routes.get('/incidents', incidentsController.listIncidents);

routes.get('/incidents/:ong_id', incidentsController.listIncidents);

routes.post('/incident', incidentsController.addIncident);

routes.delete('/incident/:id', incidentsController.deleteIncident);

module.exports = routes;