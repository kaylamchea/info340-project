import React, { Component } from 'react'; //import React Component

export class Footer extends Component {
    render() {
        return(
            <footer>
                <div className="footer text-center py-3">
                <p id="contact">
                    Contact Information: <a href="mailto:kayla900@uw.edu">kayla900@uw.edu</a> or <a
                    href="mailto:divij@uw.edu">divij@uw.edu</a>
                </p>

                <p>
                    @2020 Copyright: Kayla C. and Divij S.
                </p>
                </div>
          </footer>
         );
    }
}