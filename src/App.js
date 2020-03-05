import React, { Component } from 'react'; //import React Component
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import { HomePage } from './HomePage';
import { FormPage } from './FormPage';
import { ResPage } from './ResPage';
import { SavedPage } from './SavedPage';

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
    this.updateSaved = this.updateSaved.bind(this);

    this.state = {
      location: '',
      distance: '1609',
      price: '1',
      categories: '',
      savedRes: []
    };
  }

  handleChange(key, value) {
    let stateChanges = {
      [key]: value
    };

    this.setState(stateChanges);
  }

  updateSaved(res) {
    this.setState(prevState => ({
      savedRes: [...prevState.savedRes, res]
    }));
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
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/form'}>
              <FormPage onUpdate={this.handleChange}></FormPage>
            </Route>
            <Route path={process.env.PUBLIC_URL + '/saved'}>
              <SavedPage res={this.state.savedRes}></SavedPage>
            </Route>
            <Route path={process.env.PUBLIC_URL + '/res'}>
              <ResPage formInfo={this.state} onUpdate={this.updateSaved}></ResPage>
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