import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
// import Login from './screens/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import Landing from './components/Landing/landing'
import Navbar from './screens/navbar';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Router>
    <Navbar />
    
      <Switch>
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/login' component = {Login}></Route>
    </Switch>
    </Router>
    </Provider>
    </div>

  );
}

export default App;
