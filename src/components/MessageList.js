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

    let activeRoomMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom);
    
    return (
      <section>
        <ul id="messages-list">
          {activeRoomMessages.map( (message, index) =>
            <li className="message" key={index}>
              {message.content}
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default MessageList;
