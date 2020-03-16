import React, { Component } from 'react'; //import React Component
import axios from 'axios';
import { Footer } from './Footer';
import { Link } from "react-router-dom";
import firebase from './firebase.js';

export class ResPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            potential: [],
            curr: '',
            location: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    checkParam() {
        let config = '';
        if (this.props.formInfo) {
            config = {
                headers: { 'Authorization': 'Bearer t10OHYRfo3GYd6y-YdlHTkGWv8yX9VQegs5ucOD8KrVnfED2v6wceVS-WRRP8B3nbA5_wXQfD2A4OvG1B2lmzFB3MCkbP3keFNOcvZuD8hjbvsWF0SRI8IoUQYNhXnYx'},
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

    handleClick() {
        let randomRes = (this.state.potential)[Math.floor(Math.random() * (this.state.potential).length)];
        this.setState({ curr: randomRes });
        let location = randomRes.location.display_address.join(' ');
        this.setState({ location: location })
    }

    handleSave() {
        let curr = this.state.curr;

        let savedRef = firebase.database().ref('saved').child(firebase.auth().currentUser.uid);
        let res = {
            location: this.state.location,
            rating: curr.rating,
            price: curr.price,
            image: curr.image_url,
            url: curr.url
        }
        savedRef.child(curr.name).set(res);
        // itemsRef.push(item);
        // let saved = [curr.name, this.state.location, curr.rating, curr.price, curr.image_url, curr.url];
        // this.props.onUpdate(saved);
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

                            <a role="button" aria-label="Learn more" className="btn btn-dark" href={curr.url} target="_blank">Learn more</a>
                            { isLoggedIn 
                                ? <button type="button" className="btn btn-secondary" onClick={this.handleSave}>Save</button>
                                : <p>Please sign in to save</p>
                            }
                        </div>
                    </div>
                    <div className="choice-buttons">
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Next restaurant</button>
                        <Link role="button" aria-label="Go to form" className="btn btn-secondary start-btn" to={process.env.PUBLIC_URL + '/form'}>Go back</Link>
                    </div>
                </main>
                <Footer></Footer>
            </>
        )
    }
}