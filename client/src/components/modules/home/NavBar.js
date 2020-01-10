import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../../css/Home.css";


/**
 * Define the "NavBar" component as a class.
 */
class NavBar extends Component {
    // makes props available in this component
    constructor(props) {
      super(props);
    }
  
    // required method: whatever is returned defines what
    // shows up on screen
    render() {
      return (
        <nav className="NavBar-container u-flex">
            <div className="NavBar-logo">Possible</div>
            <Link to="/" className="NavBar-link">
                How It Works
            </Link>
            <Link to="/profile/" className="NavBar-link">
                Q+A
            </Link>
            <Link to="/profile/" className="NavBar-link">
                Meet Our Providers
            </Link>
            <Link to="/profile/" className="NavBar-link">
                About Us
            </Link>
            <Link to="/profile/" className="NavBar-link">
                Login
            </Link>
            <div className="NavBar-qualificationContainer qualificationContainer u-buttonShadow">
                <Link to="/profile/" className="NavBar-qualification">
                    GET QUALIFIED
                </Link>
            </div>
      </nav>
      );
    }
  }
  
  export default NavBar;