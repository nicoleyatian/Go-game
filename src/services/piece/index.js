'use strict';

const service = require('feathers-sequelize');
const piece = require('./piece-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: piece(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/pieces', service(options));

  // Get our initialize service to that we can bind hooks
  const pieceService = app.service('/pieces');

  // Set up our before hooks
  pieceService.before(hooks.before);

  // Set up our after hooks
  pieceService.after(hooks.after);
};
