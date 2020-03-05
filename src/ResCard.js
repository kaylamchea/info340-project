import React, { Component } from 'react'; //import React Component

export class ResCard extends Component {
    render() {
        return(
            <>
                <div class="saved-res" id={this.props.name}>
                    <img id="image" src={this.props.image} alt="Restaurant of interest" />

                    <div className="restaurant-info">
                        <p>
                            <strong>Restaurant Name: </strong>
                            <a href={this.props.url}>{this.props.name}</a>
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
                </div>

            </>
        );
    }

}
