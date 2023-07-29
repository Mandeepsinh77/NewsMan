import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";



export default class App extends Component {

  render() {
    const noPages = 6;
    return (
      <>
        <Navbar />
        {/* <News pageSize={5} contry="in" category="sports" /> */}
        <BrowserRouter>
          <Switch>
            <Route exact path='/'> <News pageSize={noPages} contry="in" category="general" /></Route>
            <Route exact path='/business'> <News pageSize={noPages} contry="in" category="business" /></Route>
            <Route exact path='/entertainment'> <News pageSize={noPages} contry="in" category="entertainment" /></Route>            <Route exact path='/health'> <News pageSize={5} contry="in" category="health" /></Route>
            <Route exact path='/science'> <News pageSize={noPages} contry="in" category="science" /></Route>
            <Route exact path='/sports'> <News pageSize={noPages} contry="in" category="sports" /></Route>
            <Route exact path='/technology'> <News pageSize={noPages} contry="in" category="technology" /></Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}