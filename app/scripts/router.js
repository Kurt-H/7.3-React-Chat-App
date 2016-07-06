var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-DOM');

var Message = require('./models/message').Message;
var MessageCollection = require('./models/messages-collection').MessageCollection;
var User = require('./models/user').User;
var ChatAppComponent = require('./components/index.jsx').ChatAppComponent;


var Router = Backbone.Router.extend({
  routes: {
    'login': 'login',
    'chat': 'chat'
  },
  initialize: function(){
    this.user = new User();
    this.collection = new MessageCollection();
  },
  'login': function(){
    //alert('user login'); //enter "#login" after "dist/" in address bar

  },
  'chat': function(){
    //alert('chat'); //enter "#chat" after "dist/" in address bar
  }
})

ReactDOM.render(
  React.createElement(ChatAppComponent),
  document.getElementById('app')
);


var router = new Router();
module.exports = router;
