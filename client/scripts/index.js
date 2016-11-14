var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router'),
    fetch = require('whatwg-fetch');

var App = React.createClass({
   render: function() {
      return this.props.children;
   }
});

var NonAdmin = React.createClass({
   render: function() {
      return (
         <div>
            { this.props.children }
         </div>
      );
   }
});

var requireNoAuth = function(nextState, replace) {
   if (Auth.isLoggedIn()) {
      replace({
         pathname: '/admin',
         state: { nextPathname: nextState.location.pathname }
      });
   }
}

var requireAuth = function(nextState, replace) {
   if (!Auth.isLoggedIn()) {
      replace({
         pathname: '/login',
         state: { nextPathname: nextState.location.pathname }
      });
   }
}

var routes = {
   Home: require('../routes/Home'),
   Game: require('../routes/Game'),
   Login: require('../routes/Login')
};

var routes = (
   <Router.Route name="app" path="/" component={App}>
      <Router.Route name="non-admin" component={NonAdmin}>
         <Router.Route name="login" path="/login" component={routes.Login} onEnter={requireNoAuth}/>
         <Router.Route name="game" path="/:gameName" component={routes.Game}/>

         <Router.IndexRoute name="home" component={routes.Home}/>
         <Router.Route path="*" component={routes.Home}/>
      </Router.Route>
   </Router.Route>
);

ReactDOM.render((
   <Router.Router history={Router.browserHistory}>
      {routes}
   </Router.Router>
), document.getElementById('react_container'));