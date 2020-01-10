import React, { Component } from "react";
import HomePage from "../modules/home/HomePage.js"

/**
 * Define the "Home" component as a class.
 */
class Home extends Component {
    // makes props available in this component
    constructor(props) {
      super(props);
    }
  
    // required method: whatever is returned defines what
    // shows up on screen
    render() {
      return (
        <div>
            <HomePage />
        </div>
      );
    }
  }
  
  export default Home;