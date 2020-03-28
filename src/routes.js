const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const loginController = require('./controllers/loginController');

const ongController = require('./controllers/ongsControler');

const incidentsController = require('./controllers/incidentsController');

const routes = express.Router();

routes.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), loginController.loginOng);

routes.post('/ong', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    state: Joi.string().required().length(2)
  })
}), ongController.addOng);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    pag: Joi.number()
  })
}), incidentsController.listIncidents);

routes.get('/incidents/:ong_id', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    pag: Joi.number()
  })
}), incidentsController.listIncidents);

routes.post('/incident', celebrate({
  [Segments.HEADERS]: Joi.object({
    ong_id: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), incidentsController.addIncident);

routes.delete('/incident/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    ong_id: Joi.string().required()
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentsController.deleteIncident);

module.exports = routes;
