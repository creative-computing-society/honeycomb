import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
// import Login from './screens/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';

import Navbar from './screens/navbar';
import Login from './screens/Login';

function App() {
  return (
    <Provider store={store}>
    <Navbar />
    <Router>

    <Route path = '/login' component = {Login}></Route>

    </Router>
    </Provider>
  );
}

export default App;
