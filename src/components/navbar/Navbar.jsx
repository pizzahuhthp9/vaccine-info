import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from "react-router-dom";

import Graph from '../../views/Graph'
import Incident from '../../views/Incident'

function Link(props) {
    let match = useRouteMatch({
      path: props.to,
      exact: props.activeOnlyWhenExact,
    });
  
    if (match) {
      return (
        <NavLink className="font-bold" to={props.to} activeOnlyWhenExact={props.activeOnlyWhenExact}> 
          {props.children}
        </NavLink>
      );
    }
    return <NavLink to={props.to} activeOnlyWhenExact={props.activeOnlyWhenExact}>{props.children} </NavLink>;
  }

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="flex justify-center space-x-4">
            <Link to="/" activeOnlyWhenExact={true}>Home</Link>
            <Link to="/incident" activeOnlyWhenExact={true}>Incident</Link>
        </div>

        <Switch>
            <Route exact path="/">
                <Graph></Graph>
            </Route>
            <Route path="incident">
                <Incident></Incident>
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default Navbar;
