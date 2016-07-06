var $ = require('jquery');
var Backbone = require('backbone');
//var React = require('react');
//var ReactDOM = require('react-dom');

var router = require('./router');

$(function(){
  Backbone.history.start();
});

// var ChatAppComponent = require('./components/index.jsx').ChatAppComponent;
//
// ReactDOM.render(
//   React.createElement(ChatAppComponent),
//   document.getElementById('app')
// )
