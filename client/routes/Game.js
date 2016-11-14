var React = require('react');
var ReactBS = require('react-bootstrap');
var ReactDOM = require('react-dom');

var NavBar = require('../components/NavBar');

var Game = React.createClass({
	render: function() {
      var self = this;

		return (
         <div className="game-info container">
         Game
         </div>
      );
	}
});

module.exports = Game;
