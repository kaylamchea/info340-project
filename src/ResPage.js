import React, { Component } from 'react';
import { Link } from "react-router-dom";
import firebase from './firebase.js';
import axios from 'axios';

import { Footer } from './Footer';

export class ResPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            potential: [],
            curr: '',
            location: ''
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    // Creates parameters for the Yelp Fusion API based on the user's preferences.
    checkParam() {
        let config = '';
        if (this.props.formInfo) {
            config = {
                headers: { 'Authorization': 'Bearer t10OHYRfo3GYd6y-YdlHTkGWv8yX9VQegs5ucOD8KrVnfED2v6wceVS-WRRP8B3nbA5_wXQfD2A4OvG1B2lmzFB3MCkbP3keFNOcvZuD8hjbvsWF0SRI8IoUQYNhXnYx' },
                params: {
                    location: this.props.formInfo.location,
                    distance: this.props.formInfo.distance,
                    price: this.props.formInfo.price,
                    categories: this.props.formInfo.categories,
                    open_now: true
                }
            };
        }

        return (config);
    }

    // Calls the Yelp Fusion API and updates the list of potential restaurants with the returned results. Randomly chooses one restaurant and assigns it to be the current restaurant in the state. 
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?', this.checkParam())
            .then(res => {
                this.setState({ potential: res.data.businesses });
                let randomRes = (this.state.potential)[Math.floor(Math.random() * (this.state.potential).length)];
                this.setState({ curr: randomRes });
                let location = randomRes.location.display_address.join(' ');
                this.setState({ location: location })
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    // Randomly chooses another restaurant from the list of potential restaurants and assigns it to be the current restaurant in the state.
    handleNext() {
        let randomRes = (this.state.potential)[Math.floor(Math.random() * (this.state.potential).length)];
        this.setState({ curr: randomRes });
        let location = randomRes.location.display_address.join(' ');
        this.setState({ location: location })
    }

    // Adds restaurant to the user's list of saved restaurants.
    handleSave() {
        let curr = this.state.curr;

        let savedRef = firebase.database().ref('saved').child(this.props.user.uid);
        let res = {
            location: this.state.location,
            rating: curr.rating,
            price: curr.price,
            image: curr.image_url,
            url: curr.url
        }
        savedRef.child(curr.name).set(res);
    }

    render() {
        let curr = this.state.curr;
        let isLoggedIn = this.props.user;

        return (
            <>
                <header>
                    <h1>Find a Restaurant</h1>
                </header>
                <main>
                    <div className="restaurant-card">
                        <img id="image" src={curr.image_url} alt="Restaurant of interest" />

                        <div className="restaurant-info">
                            <p>
                                <strong>Restaurant Name: </strong>
                                {curr.name}
                            </p>

                            <p>
                                <strong>Location: </strong>
                                {this.state.location}
                            </p>

                            <p>
                                <strong>Rating: </strong>
                                {curr.rating}
                            </p>

                            <p>
                                <strong>Price: </strong>
                                {curr.price}
                            </p>

                            <a role="button" aria-label="Learn more" className="btn btn-dark" href={curr.url} rel="noopener noreferrer" target="_blank">Learn more</a>
                            {/* Shows save button if a user is logged in, otherwise prompts the user to log in to save. */}
                            {isLoggedIn
                                ? <button type="button" className="btn btn-secondary" onClick={this.handleSave}>Save</button>
                                : <p id='save-reminder'>Please sign in to save</p>
                            }
                        </div>
                    </div>
                    <div className="choice-buttons">
                        <button type="button" className="btn btn-primary" onClick={this.handleNext}>Next restaurant</button>
                        <Link role="button" aria-label="Go to form" className="btn btn-secondary start-btn" onClick={this.props.onBack} to={process.env.PUBLIC_URL + '/form'}>Go back</Link>
                    </div>
                </main>
                <Footer></Footer>
            </>
        )
    }
}