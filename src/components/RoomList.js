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
      this.setDefaultRoom();
    });
    this.roomsRef.on('child_removed', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.filter( rooms => rooms.key !== room.key ) });
    });
  }

  setDefaultRoom(clickedRoom){
    if (this.props.activeRoom === '') {
      let defaultRoom = this.state.rooms[0];
      this.props.setActiveRoom(defaultRoom);
    } else { return };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    const newRoomName = this.state.newRoomName
    this.roomsRef.push({ name: newRoomName });
    document.getElementById("added-room").reset();
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  }

  handleDelete(room) {
    this.roomsRef.child(room.key).remove();
  }

  render() {

    return (
      <section>
        <ul  id="room-list">
          {this.state.rooms.map( (room, index) =>
            <li
              className="room"
              key={index}
            >
              <span onClick = { () => this.props.setActiveRoom(room) }>{room.name}</span>
              <ion-icon name="trash" onClick={ () => this.handleDelete(room) }></ion-icon>
            </li>
            )
          }
        </ul>
        <form id="added-room" onSubmit = { (e) => this.handleSubmit(e) }>
          <input type="text" value={ this.state.newRoomName } onChange = { (e) => this.handleInputChange(e) }/>
          <button id="add-room-btn">Add Room</button>
        </form>
      </section>
    );
  }
}

export default RoomList;
