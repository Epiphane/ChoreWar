/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.User = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'user',
  'user.model'
));

// Insert models below
function full_path(name) {
  var args = [config.root, 'server', 'api'];
  var split = name.split('.');

  return path.join(config.root, 'server', 'api', split[0], name + '.model');
}

db.Game = db.sequelize.import(full_path('game'));
db.Game.Invite = db.sequelize.import(full_path('game.invite'));

db.Game.hasMany(db.Game.Invite);

// Clean up DB
db.Game.sync({ force: true });
db.Game.Invite.sync({ force: true });

module.exports = db;
