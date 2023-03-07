import React from "react";
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import Axios from "axios";
import Home from './components/pages/Home';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import Fetch from './components/auth/App';
import Search from './components/auth/search';

export default function App() {
  return (
    <>
      <Router>
          <Switch>
              <Route exact path = "/" component = {Home} />
              <Route path = "/login" component = {Login} />
              <Route path = "/register" component = {Register} />
              <Route path = "/profile" component = {Fetch} />
              <Route path = "/search" component = {Search} />
          </Switch>
      </Router>;
      </>
    );
}
