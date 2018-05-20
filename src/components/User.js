import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    if (user === null) {
      this.props.setUser("Guest")
      document.getElementById("sign-out").style.display = "none";
      document.getElementById("sign-in").style.display = "block";
    } else {
      this.props.setUser(user.displayName);
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("sign-out").style.display = "block";
    }
    });
  }

  render() {

    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    return (
      <section>
        <div>
          <h3>{ this.props.user }</h3>
        </div>
          <button  id="sign-in" onClick= { () => this.props.firebase.auth().signInWithPopup( provider ) }>Sign In</button>
          <button id="sign-out" onClick= { () => this.props.firebase.auth().signOut() }>Sign Out</button>
      </section>
    );
  }
}

export default User;
