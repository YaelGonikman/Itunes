import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import Background from '../src/Images/21562944.jpg'
import Register from './Components/Register/Registar';
import NavBar from './Components/NavBar/NavBar';
import Login from '././Components/Login/Login';
import Itunes from './Components/Itunes/Itunes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

}

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="divStyle" style={{ minHeight: '100%', backgroundImage: "url(" + Background + ")", flexDirection: "column" }}>
          <NavBar />
          <Route exact path="/" component={Itunes} />
          <div>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;