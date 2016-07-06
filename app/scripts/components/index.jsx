var $ = require('jquery');
var React = require('react');

var CreateMessage = React.createClass({

  render: function(){
    return(
      <form>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea className="form-control" id="message" rows="2"></textarea>
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </form>
    )
  }
})

var MessageList = React.createClass({
  render: function(){
    return(
      <ul className="well">
        <l1>message</l1>
        <l1>message</l1>
        <l1>message</l1>
      </ul>
    )
  }
})


var MessageBoard = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-1">
          <h3>Hello {this.props.userName}!</h3>
          <MessageList />
          <CreateMessage />
        </div>
      </div>
    )
  }
})

var UserNameForm = React.createClass({
  getInitialState: function(){
    return {
      'personName': '',
      'user': {
        'name': 'Random Name'
      }
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userName = this.state.personName;
    var newUser = {
      'name': userName
    };
    this.props.registerUser(newUser)

  },
  handleChange: function(e){
    e.preventDefault();
    this.setState({'personName': e.target.value});
  },
  render: function(){
    return(
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col-md-6 col-md-offset-1">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              inputText={this.state.text}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="name"
              placeholder="Name" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
});

var ChatAppComponent = React.createClass({

  getInitialState: function(){
    return {'user': {}}
  },
  registerUser: function(user){
    this.setState({'user': user});
  },
  render: function(){
    return(
      <div className="container">
        <UserNameForm registerUser={this.registerUser}/>
        <MessageBoard userName={this.state.user.name}/>
      </div>
    )
  }
});



module.exports = {
  'ChatAppComponent': ChatAppComponent
};
