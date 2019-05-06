import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
        <HashRouter>
          <div className = "home">
            <Route exact path = "/" component = { Home } />
          </div>
        </HashRouter>
    );
  }
}

export default App;