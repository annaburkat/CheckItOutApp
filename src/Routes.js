import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './containers/Home/Home';
import Contact from './containers/Contact/Contact';
import Login from './containers/Login/Login';
import NotFound from './containers/NotFound/NotFound';
import Place from './containers/Place/Place';
import Places from './containers/Places/Places';
import Profile from './containers/Profile/Profile';
import Signup from './containers/Signup/Signup';
import NewPlace from './containers/NewPlace/NewPlace';
import UpdatePlace from './containers/UpdatePlace/UpdatePlace';
import NewReview from './containers/NewReview/NewReview';
import UpdateUser from './containers/UpdateUser/UpdateUser';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/contact" exact component={Contact} props={childProps} />
    <Route path="/signup" exact component={Signup} props={childProps} />
    <Route path="/login" exact component={Login} props={childProps} />
    <Route path="/profile" exact component={Profile} props={childProps} />
    <Route path="/update-user" exact component={UpdateUser} props={childProps} />
    <Route path="/forgot-password" exact component={ForgotPassword} props={childProps} />
    <Route path="/places/:slug" exact component={Place} props={childProps} />
    <Route path="/update-place/:slug" exact component={UpdatePlace} props={childProps} />
    <Route path="/places" exact component={Places} props={childProps} />
    <Route path="/new-place" exact component={NewPlace} props={childProps} />
    <Route path="/places/:slug/reviews" exact component={NewReview} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
