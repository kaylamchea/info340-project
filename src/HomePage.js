import React, { Component } from 'react'; //import React Component
import image from './img/man-thinking.jpeg';
import { Footer } from './Footer';

export class HomePage extends Component {
  render() {
    return(
      <>
        <hr></hr>

        <header>
          <h1>About Restaurant Picker</h1>
        </header>

        <main>
        <div className="project-desc">
          <div>
           <div id="mission">
              <p>Our mission is to help people save precious time spent on deciding</p>
              <p>where to eat. With our application, users can generate a random</p>
              <p>open restaurant that matches their preferences.</p>
            </div>

            <p id="features-label"><strong>Features:</strong></p>
           <ul aria-labelledby="features-label">
              <li>Find nearby restaurants based on your location</li>
              <li>Filter restaurants by food categories, price, and distance</li>
              <li>View relevant information about the selected restaurant</li>
            </ul>
          </div>

          <img src={image} alt="Man sitting down and staring at his laptop"/>
        </div>

        <div className="text-center">
          <a role="button" aria-label="Go to form" className="btn btn-dark start-btn" href="/form">Lets get
            started!</a>
        </div>
      </main>

      <Footer></Footer>
    </>
    );
  }
}