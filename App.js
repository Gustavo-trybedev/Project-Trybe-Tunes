import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './index.css';

class App extends Component {
  render() {
    return (
      <main className="main-content">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
