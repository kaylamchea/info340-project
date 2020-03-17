import React, { Component } from 'react';
import firebase from './firebase.js';

export class ResCard extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
    }

    // Deletes restaurant from user's list of saved restaurants.
    handleDelete(resName) {
        let userID = firebase.auth().currentUser.uid;
        firebase.database().ref('saved/' + userID + '/' + resName).remove();
    }

    render() {
        return (
            <>
                <div className="saved-res" id={this.props.name}>
                    <img id="image" src={this.props.image} alt="Restaurant of interest" />

                    <div className="restaurant-info">
                        <p>
                            <strong>Restaurant Name: </strong>
                            <a href={this.props.url} rel="noopener noreferrer" target="_blank">{this.props.name}</a>
                        </p>

                        <p>
                            <strong>Location: </strong>
                            {this.props.location}
                        </p>

                        <p>
                            <strong>Rating: </strong>
                            {this.props.rating}
                        </p>

                        <p>
                            <strong>Price: </strong>
                            {this.props.price}
                        </p>
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={() => this.handleDelete(this.props.name)}>Delete</button>
                </div>

            </>
        );
    }

}
