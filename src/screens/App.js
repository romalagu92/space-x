import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LIMIT } from "../constants/app";
import Landing from "./landing/Landing";
import "../styles/_reset.scss";
import "../styles/_typography.scss";
import "./app.scss";

const App = () => (
    <>
        <Header />
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to={`/launches?limit=${LIMIT}`} />} />
                <Route path="/launches" component={Landing} />
            </Switch>
            <Footer />
        </Router>
    </>
);

export default App;

const Header = () => {
    return (
        <header className="header">
            <h1>SpaceX Launch Programs</h1>
        </header>
    );
};

const Footer = () => {
    return <footer className="footer">Developed By:Roma</footer>;
};
