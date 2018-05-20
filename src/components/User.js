import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }

  render() {

    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    let displayName;
    if (this.props.user === null) {
      displayName = (
        <h3>Guest</h3>
      )
    } else {
      displayName = (
        <h3>{ this.props.user.displayName }</h3>
      )
    }

    return (
      <section>
        <div>{ displayName } </div>
          <button onClick= { () => this.props.firebase.auth().signInWithPopup( provider ) }>Sign In</button>
          <button onClick= { () => this.props.firebase.auth().signOut() }>Sign Out</button>
      </section>
    );
  }
}

export default User;
