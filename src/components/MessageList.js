import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super (props);

    this.state = {
      messages: [],
      newMessageContent: ""
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

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ newMessageContent: e.target.value });
  }

  sendNewMessage(e) {
    e.preventDefault();
    if (!this.state.newMessageContent) { return }
    const content = this.state.newMessageContent;
    const roomId = this.props.activeRoom.key;
    const username = this.props.user;
    const sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.messagesRef.push({
      content: content,
      roomId: roomId,
      sentAt: sentAt,
      username: username
    });
    const sendMessage =  document.getElementById("send-message");
    sendMessage.reset();
  }

  render() {

    let activeRoomMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);

    return (
      <section id="message-view">
        {
          activeRoomMessages.map( (message, index) => {
            let formattedTime = (new Date(message.sentAt)).toLocaleString();
            return (
            <div key={index} className="message">
              <p className="message-username">{message.username}</p>
              <p className="message-time">{ formattedTime }</p>
              <p className="message-content">{message.content}</p>
            </div>
          )
          })
        }
        <form id="send-message" onSubmit = { (e) => this.sendNewMessage(e) } >
          <input id="message-text" type="text" placeholder="Write your message here..." onChange = { (e) => this.handleInputChange(e) }></input>
          <button id="send-btn">Send</button>
        </form>
      </section>
    );
  }
}

export default MessageList;
