var Backbone = require('backbone');

var Message = require('./message').Message;

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages'
});


module.exports = {
  'MessageCollection': MessageCollection
};
