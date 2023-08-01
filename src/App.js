import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

export default class App extends Component {
  noPages = 6;
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'> <News key="general" pageSize={this.noPages} contry="in" category="general" /></Route>
            <Route exact path='/business'> <News key="business" pageSize={this.noPages} contry="in" category="business" /></Route>
            <Route exact path='/entertainment'> <News key="entertainment" pageSize={this.noPages} contry="in" category="entertainment" /></Route>
            <Route exact path='/health'> <News key="health" pageSize={this.noPages} contry="in" category="health" /></Route>
            <Route exact path='/science'> <News key="science" pageSize={this.noPages} contry="in" category="science" /></Route>
            <Route exact path='/sports'> <News key="sports" pageSize={this.noPages} contry="in" category="sports" /></Route>
            <Route exact path='/technology'> <News key="technology" pageSize={this.noPages} contry="in" category="technology" /></Route>
          </Switch>
        </Router>
      </>
    )
  }
}