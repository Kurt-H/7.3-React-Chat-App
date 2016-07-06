var Backbone = require('backbone');


var Message = Backbone.Model.extend({
  defaults: {
    'username': '',
    'message': '',
    'createdAt': ''
  }
});


module.exports = {
  'Message': Message
};
