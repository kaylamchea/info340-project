import React, { Component } from 'react'; //import React Component
import { ResCard } from './ResCard'
import axios from 'axios';
import { Footer } from './Footer';
  
export class ResPage extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            potential: []
        };

    }

    checkParam() {
        let config = '';
        if(this.props.formInfo) {
            config  = {
                headers: {'Authorization': 'Bearer GCdrOGFk2ro5ZOxbZWFGg-c8ECXqeeUp0rByZzImIIGDGBRzo_F7hgjeHk5RRO6TIH6BSSVW7eTEr8p0F3zT8u7nTyuBXgEVcOp4_SKkCHmCvrj4g-ZcD30KkVdhXnYx'},
                params: {
                  location: this.props.formInfo.location,
                  distance: this.props.formInfo.distance,
                  price: this.props.formInfo.price,
                  categories: this.props.formInfo.categories,
                  open_now: true
                }
            };
        }

        return(config);
    }    

    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?', this.checkParam())
        .then(res => { 
            this.setState({potential: res.data.businesses});
        })
    }

    render() {
        let res = [];
        if(this.state.potential.length > 0) {
            console.log(this.state.potential);
            let randomRes = (this.state.potential)[Math.floor(Math.random() * (this.state.potential).length)];
            console.log(randomRes);
            res.push (
                <ResCard name={randomRes.name} address={randomRes.location.display_address.join(' ')} price={randomRes.price} rating={randomRes.rating} image={randomRes.image_url} url={randomRes.url}></ResCard>
            );
        }

        return (
            <>
            <header>
                <h1>Find a Restaurant</h1>
            </header>
            {res}
            <Footer></Footer>
            </>
        )
      }  
}