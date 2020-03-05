import React, { Component } from 'react'; //import React Component

export class ResPage extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            location: '',
            distance: '',
            price: '',
            categories: ''
        };
    }

    render() {
        return(<div>I am in pain</div>); 
    }
}