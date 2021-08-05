import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePeminjaman from "./containers/HomePeminjaman";
import DetailPeminjaman from "./containers/DetailPeminjaman";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron />
        <Router>
          <Route path="/" exact component={HomePeminjaman} />
          <Route path="/detail/:id" exact component={DetailPeminjaman} />
        </Router>
      </div>
    );
  }
}
