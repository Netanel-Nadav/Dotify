import React from 'react';
import { Routes, Route, Switch } from 'react-router'
// import routes from './routes'

import { Header } from './cmps/Header';
import { MusicPlayer } from './cmps/MusicPlayer';
import { Navigation } from './cmps/Navigation';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { UserProfile } from './pages/UserProfile';



export function RootCmp() {
  return (
    <div className="App main-container">
      <Header />
      <Navigation />
      <main>
        <Switch>
            <Route component={UserProfile} path="/user/:id"/>
            <Route component={LoginPage} path="/login"/>
            <Route component={Home} path="/"/>
        </Switch>
      </main>
      <MusicPlayer />
    </div>
  );
}
