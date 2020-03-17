import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import firebase, { auth, provider } from './firebase.js';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import { HomePage } from './HomePage';
import { FormPage } from './FormPage';
import { ResPage } from './ResPage';
import { SavedPage } from './SavedPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      location: '',
      distance: '1609',
      price: '1',
      categories: '',
      user: null
    };

    this.savedRef = firebase.database().ref('saved');
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;

        this.setState({
          user
        });

        const userRef = this.savedRef.child(user.uid);
        userRef.on("value", (snapshot) => {
          this.setState({ saved: snapshot.val() })
        })
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  handleChange(key, value) {
    let stateChanges = {
      [key]: value
    };

    this.setState(stateChanges);
  }

  resetState() {
    let stateChanges = {
      location: '',
      categories: ''
    };
    this.setState(stateChanges);
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar expand="lg">
            <Navbar.Brand><NavLink to={process.env.PUBLIC_URL + '/'}>Restaurant Picker</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <NavLink exact to={process.env.PUBLIC_URL + '/'}>Home</NavLink>
                <NavLink exact to={process.env.PUBLIC_URL + '/form'} onClick={this.resetState}>Find Restaurants</NavLink>
                <NavLink exact to={process.env.PUBLIC_URL + '/saved'}>Saved Restaurants</NavLink>
              </Nav>
  
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
              }
            </Navbar.Collapse>

          </Navbar>

          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/form'}>
              <FormPage location={this.state.location} categories={this.state.categories} onUpdate={this.handleChange}></FormPage>
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/saved'}>
              <SavedPage user={this.state.user} res={this.state.saved}></SavedPage>
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/res'}>
              <ResPage user={this.state.user} formInfo={this.state} onBack={this.resetState}></ResPage>
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/'}>
              <HomePage></HomePage>
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}