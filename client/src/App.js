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
import Main from './screens/mainpage'
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
    <Navbar />
    
      <Switch>
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/login' component = {Login}></Route>
    <Route path = '/team-registration' component = {Team}/>
    <Route path = '/maze/:roomId' component={Room}/>
    <Route path = '/path/:qID' component={Question}/>
    <Route path='/main' component = {Main}></Route>
    </Switch>
    </Router>
    </PersistGate>
    </Provider>
    </div>

  );
}

export default App;
