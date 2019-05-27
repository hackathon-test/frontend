import React, { Component } from 'react';
import HomePanel from "./components/HomePanel";
import ScanQRCode from './components/ScanQRCode';
import Comment from './components/Comment';

export default class App extends Component {
    render() {
        return (
          <HomePanel />
        );
    }
}

