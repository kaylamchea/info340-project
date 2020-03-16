import React, { Component } from 'react'; //import React Component
import { Footer } from './Footer';
import { ResCard } from './ResCard';

export class SavedPage extends Component {
    render() {
        let restaurants = [];
        let isLoggedIn = this.props.user;

        if(this.props.res) {
            let resData = this.props.res;

            Object.keys(resData).map(key => {
                restaurants.push(
                    <ResCard key={key} name={key} location={resData[key].location} rating={resData[key].rating} price={resData[key].price} image={resData[key].image} url={resData[key].url}></ResCard>
                )
            })
        }

        return (
            <>
                <hr></hr>
                <header>
                    <h1>Saved Restaurants</h1>
                </header>
                <main>
                {isLoggedIn
                    ? <div id="res-container">{restaurants}</div>
                    : <p>Please sign in to see saved restaurants.</p>
                }
                </main>
                <Footer></Footer>
            </>
        );
    }
}

