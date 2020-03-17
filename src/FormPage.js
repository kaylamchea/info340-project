import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Footer } from './Footer';
import CheckBox from './CheckBox';

export class FormPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                { id: 1, value: "asianfusion", name: "Asian", isChecked: false },
                { id: 2, value: "bbq", name: "BBQ", isChecked: false },
                { id: 3, value: "chinese", name: "Chinese", isChecked: false },
                { id: 4, value: "hotdogs", name: "Fastfood", isChecked: false },
                { id: 5, value: "hawaiian", name: "Hawaiian", isChecked: false },
                { id: 6, value: "indpak", name: "Indian", isChecked: false },
                { id: 7, value: "italian", name: "Italian", isChecked: false },
                { id: 8, value: "japanese", name: "Japanese", isChecked: false },
                { id: 9, value: "korean", name: "Korean", isChecked: false },
                { id: 10, value: "mexican", name: "Mexican", isChecked: false },
                { id: 11, value: "pizza", name: "Pizza", isChecked: false },
                { id: 12, value: "sushi", name: "Sushi", isChecked: false },
                { id: 13, value: "thai", name: "Thai", isChecked: false },
                { id: 14, value: "vegan", name: "Vegan", isChecked: false },
                { id: 15, value: "vegetarian", name: "Vegetarian", isChecked: false }
            ],
        }
    }

    // Toggles checkboxes on and off. Keeps track of which checkboxes are checked. 
    handleCheckChieldElement = (event) => {
        let options = this.state.options;
        options.forEach(option => {
            if (option.value === event.target.value)
                option.isChecked = event.target.checked
        })

        this.setState({ options: options }, () => {
            let result = options.filter(res => res.isChecked).map(ele => ele.value);
            this.props.onUpdate('categories', result);
        });
    }

    render() {
        let onUpdate = this.props.onUpdate;

        return (
            <>
                <hr></hr>

                <header>
                    <h1>Find a restaurant</h1>
                </header>

                <main>
                    <form aria-label="Submit restaurant preferences">
                        <div className="form-content">
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <input type="text" name="location" className="form-control" id="location" placeholder="Enter address, city, or zip code" onChange={(event) => onUpdate(event.target.name, event.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="distance">Price:</label>
                                <select className="form-control" id="price" name="price" onChange={(event) => onUpdate(event.target.name, event.target.value)}>
                                    <option value="1">$</option>
                                    <option value="2">$$</option>
                                    <option value="3">$$$</option>
                                    <option value="4">$$$$</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="distance">Max distance (select one):</label>
                                <select className="form-control" id="distance" name="distance" onChange={(event) => onUpdate(event.target.name, event.target.value)}>
                                    <option value="1609">&lt; 1 mile</option>
                                    <option value="8047">&lt; 5 miles</option>
                                    <option value="16093">&lt; 10 miles</option>
                                    <option value="24140">&lt; 15 miles</option>
                                    <option value="32187">&lt; 20 miles</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <p id="checkbox-label">What are you in the mood for?</p>
                                {
                                    this.state.options.map((option) => {
                                        return (<CheckBox key={option.id} handleCheckChieldElement={this.handleCheckChieldElement}  {...option} />)
                                    })
                                }
                            </div>

                            {/* Shows disabled button until the form is properly filled in. */}
                            {
                                this.props.location && this.props.categories
                                    ? <Link role="button" aria-label="Go to restaurant" className="btn btn-dark start-btn" to={process.env.PUBLIC_URL + '/res'}>Go!</Link>
                                    : <Link role="button" to="/" className="btn btn-outline-dark disabled" onClick={(event) => event.preventDefault()}>Go!</Link>
                            }
                        </div>
                    </form>
                </main>

                <Footer></Footer>
            </>
        );
    }
}