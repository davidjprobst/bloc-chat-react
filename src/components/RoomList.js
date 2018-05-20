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
    const addRoom =  document.getElementById("add-room");
    addRoom.reset();
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  }

  render() {
  //  this.props.setDefaultRoom(defaultRoom);

    return (
      <section>
        <ul  id="room-list">
          {this.state.rooms.map( (room, index) =>
            <li
              className="room"
              key={index}
              onClick = { () => this.props.setActiveRoom(room) }
            >
            {room.name}
            </li>
            )
          }
        </ul>
        <form id="add-room" onSubmit = { (e) => this.handleSubmit(e) }>
          <input type="text" value={ this.state.newRoomName } onChange = { (e) => this.handleInputChange(e) }/>
          <button id="add-room-btn">Add Room</button>
        </form>
      </section>
    );
  }
}

export default RoomList;
