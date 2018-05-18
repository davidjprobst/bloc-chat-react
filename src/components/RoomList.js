import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super (props);

    this.state = {
      rooms: [],
      newRoomName: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    const newRoomName = this.state.newRoomName
    this.roomsRef.push({ name: newRoomName });
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  }

  render() {

    return (
      <section>
        <p>{this.props.activeRoom.name}</p>
        <ul  id="room-list">
          {this.state.rooms.map( (room, index) =>
            <li
              className="room"
              key={index}
              onClick = { () => this.props.setActiveRoom(room) }>{room.name}
            </li>
          )}
        </ul>
        <form className="add-room" onSubmit = { (e) => this.handleSubmit(e) }>
          <input type="text" value={ this.state.newRoomName } onChange = { (e) => this.handleInputChange(e) }/>
          <input type="submit" />
        </form>
      </section>
    );
  }
}

export default RoomList;
