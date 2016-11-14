var React = require('react'),
    Router = require('react-router');
var NavBar = require('../components/NavBar');

var Home = React.createClass({
   contextTypes: {
      router: React.PropTypes.object.isRequired
   },

   componentWillMount: function() {
      if (this.props.location.pathname.length > 1) {
         this.context.router.push('/');
      }  
   },

   getInitialState: function() {
      return { loading: null };
   },

   newGame: function() {
      var loading = (
         <span>
         &nbsp;
         <i className="fa fa-spin fa-circle-o-notch"></i>
         </span>
      );

      this.setState({
         loading: loading
      });
   },

	render: function() {
		return (
         <div>
            <div className="container home text-center">
               <h1 className="text-center">Chore War</h1>
               <a onClick={this.newGame} className="btn btn-primary">New Game
                  {this.state.loading}
               </a>
            </div>
         </div>
		);
	}
});

module.exports = Home;
