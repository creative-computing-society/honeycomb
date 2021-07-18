import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Login from './screens/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Route path='/login' component = {Login}/>
    </Router>
    </Provider>
  );
}

export default App;
