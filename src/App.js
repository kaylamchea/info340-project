import React, { Component } from 'react'; //import React Component
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import { HomePage } from './HomePage';
import { FormPage } from './FormPage';
import { ResPage } from './ResPage';
import { SavedPage } from './SavedPage';
import firebase, { auth, provider } from './firebase.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(key, value) {
    let stateChanges = {
      [key]: value
    };

    this.setState(stateChanges);
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

  render() {
    return (
      <Router>
        <div>
          <Navbar>
            <Navbar.Brand href={process.env.PUBLIC_URL + '/'}>Restaurant Picker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <Link className="underline" to={process.env.PUBLIC_URL + '/'}>Home</Link>
                <Link className="underline" to={process.env.PUBLIC_URL + '/form'}>Find Restaurants</Link>
                <Link className="underline" to={process.env.PUBLIC_URL + '/saved'}>Saved Restaurants</Link>
              </Nav>
            </Navbar.Collapse>
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>                
              :
              <button onClick={this.login}>Log In</button>              
            }
          </Navbar>

          <Switch>
            <Route path={process.env.PUBLIC_URL + '/form'}>
              <FormPage onUpdate={this.handleChange}></FormPage>
            </Route>
            <Route path={process.env.PUBLIC_URL + '/saved'}>
              <SavedPage user={this.state.user} res={this.state.saved}></SavedPage>
            </Route>
            <Route path={process.env.PUBLIC_URL + '/res'}>
              <ResPage user={this.state.user} formInfo={this.state} onUpdate={this.updateSaved}></ResPage>
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