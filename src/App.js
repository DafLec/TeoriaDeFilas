import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div className = "home">
            <Route exact path = "/" component = { Home } />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;