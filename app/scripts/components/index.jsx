var $ = require('jquery');
var React = require('react');
var moment = require('moment');

var router = require('../router');
var collection = require('../models/messages-collection');


var CreateMessage = React.createClass({
  getInitialState: function(){
    return {
      'username': '',
      'message': '',
      'createdAt': ''
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.handleNewMessage(this.state.message);
    //$('#message-form').find('input').val(''); //alternative to using state
    this.setState({'message': ''});
  },

  handleMessageChange: function(e){
    e.preventDefault();
    this.setState({'message': e.target.value});
  },

  render: function(){
    return(
      <form onSubmit={this.handleSubmit} id="message-form">
        <div className="form-group">
            <label htmlFor="message">Message</label>
            <input
              value={this.state.message}
              onChange={this.handleMessageChange}
              className="form-control"
              id="message"
              placeholder="Message"
              rows="2" />
            <button type="submit" className="btn btn-default">Submit Message</button>
            <a className="btn btn-default" href="#login" role="button">Return to Login</a>
        </div>
      </form>
    );
  }
});

var MessagesDisplay = React.createClass({
  render: function(){
    // console.log(this.props.messages);
    var messages = this.props.messages;
    // console.log(messages);
    var messagesList = messages.map(function(data) {
      return (
        // console.log(data.get('message'))
        <li key={data.get('_id')}>
          Name: {data.get('username')};
          Msg: {data.get('message')};
          '': {data.get('createdAt')}
        </li>
      );
    })
    return(
      <ul className="well">
          {messagesList}
      </ul>
    );
  }
});

//owner of MessagesList and CreateMessage
var MessageBoard = React.createClass({
  getInitialState: function(){
    return {
      messages: new collection.MessageCollection()
    }
  },
  componentWillMount: function(){
    var self = this;

    var messagesCollection = new collection.MessageCollection();
    messagesCollection.fetch().done(function(data){
      // console.log("data ", data);
      self.setState({messages: messagesCollection});
    });

    messagesCollection.on('add', this.update)

    this.intervalId = setInterval(function(){
      messagesCollection.fetch()
    }, 30000)
  },

  componentWillUnmount: function(){
    clearInterval(this.intervalId)
  },

  update: function(){
    this.forceUpdate()
  },

  handleNewMessage: function(message){
    this.state.messages.create({
      'username': this.props.router.user.get('username'),
      'message': message,
      'createdAt': moment().format("llll")
    }, {wait: true});
  },

  render: function(){
    // console.log(this.state.messages);
    var username = this.props.router.user.get('username')
    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-1">
          <h3>Hello {username}!</h3>
          <MessagesDisplay messages={this.state.messages}/>
          <CreateMessage handleNewMessage={this.handleNewMessage} />
        </div>
      </div>
    );
  }
});

var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      'username': ''
    };
  },

  handleSubmitName: function(e){
    e.preventDefault();
    var router = this.props.router;
    var user = this.props.router.user;
    user.set('username', this.state.username);
    router.navigate('chat', {trigger: true}); //option is required to call route function
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState({'username': e.target.value});
  },

  render: function(){
    return(
      <div className="row">
        <form onSubmit={this.handleSubmitName} className="col-md-6 col-md-offset-1">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="name"
              placeholder="Name" />
          </div>
          <button  type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
});


module.exports = {
  'LoginForm': LoginForm,
  'MessageBoard': MessageBoard
};
