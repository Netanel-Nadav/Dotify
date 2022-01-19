import React from 'react';
import { Header } from './cmps/Header';
import { MusicPlayer } from './cmps/MusicPlayer';
import { Navigation } from './cmps/Navigation';



export function RootCmp() {
  return (
    <div className="App main-container">
      <Header />
      <Navigation />
      <MusicPlayer />
    </div>
  );
}
