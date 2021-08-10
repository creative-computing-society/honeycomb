import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import Landing from './components/Landing/landing'
import Navbar from './screens/navbar';
import Login from './screens/Login';
import Team from './components/team/Team';
import Room from './screens/Room';
import Question from './screens/Question';
import Deadend from './components/deadend/deadend';
import OneDoor from './screens/doorpages/one';
import ThreeDoors from './screens/doorpages/three';

import Grid from './screens/grid-page/Grid';

import Rules from './screens/rulebook';
import gameOver from './components/win/gameover';
import notFound from './components/notfound/404';
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
    <Navbar />
    
      <Switch>
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/login' component = {Login}/>
    <Route exact path = '/maze/0' component = {OneDoor}/>
    <Route path = '/maze/1' component = {ThreeDoors}/>
    <Route path = '/team-registration' component = {Team}/>
    <Route exact path = '/maze/dead_end' component={Deadend}/>
    <Route path = '/maze/:roomId' component={Room}/>
    <Route path = '/path/:qID' component={Question}/>
    <Route path='/rulebook' component={Rules}/>
    <Route path='/gameover' component = {gameOver}/>
    <Route component= {notFound} />
    </Switch>
    </Router>
    </PersistGate>
    </Provider>
    </div>

  );
}

export default App;
