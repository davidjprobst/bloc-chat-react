import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBYT9AyKd0hDL-2E8yVkCldI0V7-9BBFyk",
  authDomain: "bloc-chat-692be.firebaseapp.com",
  databaseURL: "https://bloc-chat-692be.firebaseio.com",
  projectId: "bloc-chat-692be",
  storageBucket: "bloc-chat-692be.appspot.com",
  messagingSenderId: "1014972627285"
};
firebase.initializeApp(config);


class App extends Component {

  render() {
    return (
      <div className="App">
        <aside className="side-bar">
          <h1>Bloc Chat</h1>
          <RoomList firebase={firebase} />
        </aside>
      </div>
    );
  }
}

export default App;
