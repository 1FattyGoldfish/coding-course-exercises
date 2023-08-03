// responsible for all that initial view layer setup

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

// A route is a pairing or kind of a rule you can think of between the address the user is looking at and the components that should be displayed on the screen at any given time.
// browser router can be thought of as the brains of react router is the thing that tells react router - how to behave is the thing that looks at the current URL and then changes the set of components that are visible on the screen at any given time.
// The route object right here is a react component that is used to set up a rule between a certain route that the user might visit inside of an application and a set of components that will be actually visible on the screen.
// BrowserRouter expects at most 1 child

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// <Route exact={true} path="/"> otherwise Landing will show on every route with "/"

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
