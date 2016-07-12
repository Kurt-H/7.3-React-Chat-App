var $ = require('jquery');
var React = require('react');
var router = require('../router');

var message = require('../models/message');
var collection = require('../models/messages-collection');




var CreateMessage = React.createClass({
  getInitialState: function(){
    return {
      'username': '',
      'message': ''
    }
  },
  componentWillMount: function(){
    var self = this;
    var user = self.props.user;
  },
  // handleSubmitMessage: function(e){
  //   e.preventDefault();
  //   var router = this.props.router;
  //   var message = this.props.router.message;
  //
  // },
  // handleChange: function(e){
  //   e.preventDefault();
  //   this.setState({'message': e.target.value});
  // },
  // handleNewMessage: function(e){
//     e.preventDefault();
//     this.props.images.create({
//       'username': this.props.username,
//       'message': this.state.message
//     });
  // },


  render: function(){
    return(
      //onSubmit={this.props.handleSubmitMessage}?
      <form >
        <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea

              className="form-control"
              id="message"
              placeholder="Message"
              rows="2">
            </textarea>

          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </form>
      // value="this.props...."
      // onChange="this.props.handleChange()"
    );
  }
});

var MessagesDisplay = React.createClass({
  render: function(){
    console.log(this.props.messages);
    var messages = this.props.messages;
    // console.log(messages);

    var messagesList = messages.map(function(data) {
      return (
        // console.log(data.get('message'))
        <li key={data.get('_id')}>{data.get('message')}</li>
      );
      //how to also get back username and time?

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
      useername: this.props.username,
      messages: new collection.MessageCollection()  //or []
    }
  },
  componentWillMount: function(){
    var self = this;
    // var messages = this.props.router.collection(); //error: not a function
    var messagesCollection = new collection.MessageCollection();
    messagesCollection.fetch().done(function(data){
      // console.log("data ", data);
      self.setState({messages: messagesCollection});
    });
  },

  render: function(){
    // console.log(this.state.messages);
    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-1">
          <h3>Hello {this.props.router.user.get('username')}!</h3>
          <MessagesDisplay messages={this.state.messages}/>
          <CreateMessage />
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
