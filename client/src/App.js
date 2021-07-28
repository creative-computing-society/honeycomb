import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
// import Login from './screens/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './store';
import Landing from './components/Landing/landing'
import Navbar from './screens/navbar';
import Login from './screens/Login';
import Team from './components/team/Team';
import Room from './screens/Room';

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Router>
    <Navbar />
    
      <Switch>
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/login' component = {Login}></Route>
    <Route path = '/team-registration' component = {Team}/>
    <Route path = '/maze/:roomId' component={Room}/>
    </Switch>
    </Router>
    </Provider>
    </div>

  );
}

export default App;
