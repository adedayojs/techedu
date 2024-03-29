import React, { useContext } from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import Welcome from './Welcome/Welcome';
import Popular from './Popular/Popular';
import Login from './Login/Login';
import Contact from './Contact/Contact';
import School from './School/School';
import _404 from './_404';
import 'react-icons/';

import { UserContext } from '../UserContext';

import { Route, Redirect, Switch } from 'react-router-dom';

function Body() {
  const { schools, about } = useContext(UserContext);
  const text =
    'Below is a few list of institutions of which the major part is a popular mention. Feel free to scroll through.';
  const heading = 'Popular Insitution';
  const ourCore = 'Our Core';
  const coreText = 'These makes up who we are';
  return (
    <>
      <Switch>
        <Route exact path="/" render={renderProps => <Redirect to="/home" />} />
        <Route
          path="/home"
          render={renderProps => (
            <>
              <Jumbotron />
              <Welcome />
              <Popular {...{ data: schools, heading, text }} />
            </>
          )}
        />
        <Route
          exact
          path="/about"
          render={renderProps => (
            <>
              <Welcome />
              <Popular {...{ data: about, heading: ourCore, text: coreText }} />
            </>
          )}
        />
        <Route path="/School" render={renderProps => <School />} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />

        <Route path="*" component={_404} />
      </Switch>
    </>
  );
}

export default Body;
