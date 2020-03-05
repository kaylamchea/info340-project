import React, { Component } from 'react'; //import React Component
import { Footer } from './Footer';
import { ResCard } from './ResCard';

export class SavedPage extends Component {
    render() {
        let restaurants = [];

        console.log(this.props.res);
        if(this.props.res) {
            let resData = this.props.res;

            for (let i = 0; i < resData.length; i++) {
                restaurants.push(
                    <ResCard name={resData[i][0]} location={resData[i][1]} rating={resData[i][2]} price={resData[i][3]} image={resData[i][4]} url={resData[i][5]}></ResCard>
                )
            }
        }

        return (
            <>
                <hr></hr>
                <header>
                    <h1>Saved Restaurants</h1>
                </header>
                <main>
                    <div id="res-container">
                        {restaurants}
                    </div>
                </main>
                <Footer></Footer>
            </>
        );
    }
}