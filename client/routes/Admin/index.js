var React = require('react');
var Router = require('react-router');
// var AdminNavBar = require('../../components/AdminNavBar');

var Admin = React.createClass({
   render: function() {
      return (
         <div className="admin">
            <div id="wrapper">

               <div id="page-wrapper">
                  { this.props.children }
               </div>
            </div>
         </div>
      );
   }
});

module.exports = Admin;
