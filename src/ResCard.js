import React, { Component } from 'react'; //import React Component

export class ResCard extends Component {   
    render() {
        return(
            <div className="restaurant-card">
            <img id="image" src={this.props.image} alt="Restaurant of interest"/>
           
                <div className="restaurant-info">
                    <p>
                    <strong>Restaurant Name: </strong>
                    <a href={this.props.url} target="_blank">{this.props.name}</a>
                    </p>
            
                    <p>
                    <strong>Location: </strong>
                    {this.props.address}
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
            </div>
        );
    }
}
