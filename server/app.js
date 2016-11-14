var sqldb = require('./sqldb');
var GameController = require('./api/game/game.controller');

module.exports = function(app) {
   // manually set up the dynamic javascript files
   app.use('/api/user', require('./api/user'));
   app.use('/api/game', require('./api/game'));
   app.use('/auth', require('./auth'));
};