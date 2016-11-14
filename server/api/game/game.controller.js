/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /properties              ->  index
 * POST    /properties              ->  create
 * GET     /properties/:id          ->  show
 * PUT     /properties/:id          ->  update
 * DELETE  /properties/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var config = require(__dirname + '/../../config/environment');
var sqldb = require('../../sqldb');
var Game = sqldb.Game;
var Quote = sqldb.Game.Quote;
var Showcase = sqldb.Game.Showcase;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).json(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.send(404);
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          return res.send(204);
        });
    }
  };
}

// Get list of games
exports.index = function(req, res) {
  Game.findAll({
    order: [
      ['order', 'DESC']
    ]
  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Get a single game
exports.show = function(req, res) {
  Game.find({
    where: {
      name: req.params.name
    },
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

var RANDOM_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var RL_LEN = RANDOM_LETTERS.length;
var RANDOM_WORD = function(len) {
  var name = '';

  for (var i = 0; i < len; i ++)
    name += RANDOM_LETTERS[Math.floor(Math.random() * RL_LEN)];

  return name;
}

// Creates a new Game in the DB.
exports.create = function(req, res) {

  var submit = function(name) {
    Game.create({ name: name })
      .then(responseWithResult(res, 201))
      .catch(handleError(res)); 
  }

  var tryOne = function(triesLeft) {
    if (triesLeft === 0) {
      res.status(500).json({message: 'No available game names'});
      return;
    }

    var name = RANDOM_WORD();

    Game.findOne({
      where: {
        name: name
      }
    })
      .then(function(game) {
        if (!game) {
          return submit(name);
        }
        else {
          return tryOne(triesLeft - 1);
        }
      });
  }

  tryOne(5);
};
