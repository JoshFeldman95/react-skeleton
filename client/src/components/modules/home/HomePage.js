import React, { Component } from "react";
import { Link } from "@reach/router";
import NavBar from "./NavBar.js"
import "../../../css/Home.css";


class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="HomePage-container">
                <NavBar />
                <div className='HomePage-splashContainer u-flex'>
                    <img className='HomePage-splashImage' src={ require('../../../public/splash.png') }/>
                    <div className = "HomePage-splashTextContainer">
                        <div className="HomePage-splashTitle">Abortion pills to <br/> your doorstep</div>
                        <div className="HomePage-splashSubtitle">Safe, legal, and discreet.</div>
                    </div>
                </div>
                <div className='HomePage-banner'>
                    <div className="HomePage-qualificationContainer qualificationContainer u-buttonShadow">
                        <Link to="/profile/" className="HomePage-qualification">
                            GET QUALIFIED
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;