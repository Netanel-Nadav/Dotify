import React from 'react';
import { Routes, Route, Switch } from 'react-router'
// import routes from './routes'

import { Header } from './cmps/Header';
import { MusicPlayer } from './cmps/MusicPlayer';
import { Navigation } from './cmps/Navigation';
import { Home } from './pages/Home';



export function RootCmp() {
  return (
    <div className="App main-container">
      <Header />
      <Navigation />
      <main>
        <Switch>
            <Route component={Home} path="/"/>
        </Switch>
      </main>
      <MusicPlayer />
    </div>
  );
}
