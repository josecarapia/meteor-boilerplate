import React from "react";
import { Meteor } from "meteor/meteor";
import { Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import createHistory from "history/createBrowserHistory";

import Signup from "./../ui/Signup";
import Dashboard from "./../ui/Dashboard";
import NotFound from "./../ui/NotFound";
import Login from "./../ui/Login";

const history = createHistory();
const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/Dashboard"];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    return <Redirect to="/Dashboard" />;
  } else {
    return <Component />;
  }
};
const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />;
  } else {
    return <Component />;
  }
};

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push("/Dashboard");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push("/");
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
      <Route path="/Dashboard" render={() => onEnterPrivatePage(Dashboard)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
