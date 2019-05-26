import React, { Component } from 'react';
import {createAppContainer} from "react-navigation";
import HomePanel from "./components/HomePanel";

export default class App extends Component {
    render() {
        return (
          <HomePanel/>
        );
    }
}

