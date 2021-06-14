import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LIMIT } from "../constants/app";
import Landing from "./landing/Landing";
import "../styles/_reset.scss";
import "../styles/_typography.scss";

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to={`/launches?limit=${LIMIT}`} />} />
            <Route path="/launches" component={Landing} />
        </Switch>
    </Router>
);

export default App;
