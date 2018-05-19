import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super (props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    })
  }

  render() {

    let activeRoomMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);

    return (
      <section>
        {
          activeRoomMessages.map( (message, index) =>
          <div key={index} className="message">
            <p>{message.username}</p>
            <p>{message.sentAt}</p>
            <p>{message.content}</p>
          </div>
          )
        }
      </section>
    );
  }
}

export default MessageList;
