var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-DOM');

var User = require('./models/user').User;
var ChatAppComponent = require('./components/index.jsx').ChatAppComponent;
var LoginForm = require('./components/index.jsx').LoginForm;
var MessageBoard = require('./components/index.jsx').MessageBoard;


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'login': 'login',
    'chat': 'chat'
  },
  initialize: function(){
    this.user = new User();
  },
  login: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(LoginForm, {router: self}),
      document.getElementById('app')
    );
  },
  chat: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(MessageBoard, {router: self}),
      document.getElementById('app')
    );
  }
});


var router = new Router();
module.exports = router;
