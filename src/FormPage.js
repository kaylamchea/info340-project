import React, { Component } from 'react'; //import React Component
import { Footer } from './Footer';
import { CheckBox } from './CheckBox';

export class FormPage extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            options: [
                { value: 'asianfusion', text: 'Asian', isChecked: false},
                { value: 'bbq', text: 'Barbeque', isChecked: false},
                { value: 'chinese', text: 'Chinese', isChecked: false },
                { value: 'hotdogs', text: 'Fastfood', isChecked: false },
                { value: 'hawaiian', text: 'Hawaiian', isChecked: false },
                { value: 'indpak', text: 'Indian', isChecked: false },
                { value: 'italian', text: 'Italian', isChecked: false },
                { value: 'japanese', text: 'Japanese', isChecked: false },
                { value: 'korean', text: 'Korean', isChecked: false },
                { value: 'mexican', text: 'Mexican', isChecked: false },
                { value: 'pizza', text: 'Pizza', isChecked: false },
                { value: 'sushi', text: 'Sushi', isChecked: false },
                { value: 'thai', text: 'Thai', isChecked: false },
                { value: 'vegan', text: 'Vegan', isChecked: false },
                { value: 'vegetarian', text: 'Vegetarian', isChecked: false}
              ]
        }   
    }

    handleChange() {

    }

    render() {
        let onUpdate = this.props.onUpdate;


        return (
          <>
            <form aria-label="Submit restaurant preferences">
                <div className="form-content">
                    <div className="form-group">
                    <label>
                        Location:
                        <input type="text" name="location" className="form-control" id="location"
                            placeholder="Enter address, city, or zip code" onChange={(event) => onUpdate(event.target.name,  event.target.value)} />
                    </label>
       
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="distance">
                        Price:
                        <select className="form-control" id="price" name="price" onChange={(event) => onUpdate(event.target.name,  event.target.value)}>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                    </label> 
                </div>

                <div className="form-group">
                <label htmlFor="distance">
                    Max distance (select one):
                    <select className="form-control" id="distance" name="distance" onChange={(event) => onUpdate(event.target.name,  event.target.value)}>
                    <option value="1609">&lt; 1 mile</option>
                    <option value="8047">&lt; 5 miles</option>
                    <option value="16093">&lt; 10 miles</option>
                    <option value="24140">&lt; 15 miles</option>
                    <option value="32187">&lt; 20 miles</option>
                </select>
                </label>
                </div>

                <div class="form-group">
                    <p id="checkbox-label">What are you in the mood for?</p>
                    {/* <CheckBox options={this.state.options} onUpdate={this.handleChange} /> */}
                </div>

                <a role="button" aria-label="Go to restaurant" className="btn btn-dark start-btn" href="/restaurant">Go!</a>            
            </form>
            <Footer></Footer>
          </>
        );
      }
}