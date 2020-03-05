import React, { Component } from 'react'; //import React Component
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import { HomePage } from './HomePage';
import { FormPage } from './FormPage';
import { ResPage } from './ResPage';

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

    this.state = {
      location: '',
      distance: '1609',
      price: '1',
      categories: '',
    };
  }

  handleChange(key, value) {
      let stateChanges = {
          [key]: value
      };

      this.setState(stateChanges);
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
            <Nav.Link className="underline" href={process.env.PUBLIC_URL + '/'}>Home</Nav.Link>
            <Nav.Link className="underline" href={process.env.PUBLIC_URL + '/form'}>Find Restaurants</Nav.Link>
            <Nav.Link className="underline" href={process.env.PUBLIC_URL + '/saved'}>Saved Restaurants</Nav.Link>
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
          <div>Saved</div>
          </Route>
          <Route path={process.env.PUBLIC_URL + '/res'}>
            <ResPage formInfo={this.state}></ResPage>
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