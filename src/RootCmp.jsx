import React from 'react';
import { Route, Switch } from 'react-router'
// import routes from './routes'

import { Home } from "./pages/Home";
import { CreateStation } from "./pages/CreateStation";
import { Library } from "./pages/Library";
import { Search } from "./pages/Search";
import { Header } from "./cmps/Header";
import { AudioPlayer } from "./cmps/AudioPlayer";
import { Navigation } from "./cmps/Navigation";
import { LoginPage } from "./pages/LoginPage";
import { UserProfile } from "./pages/UserProfile";
import { StationDetails } from "./pages/StationDetails";
import { HomeScreenModal } from "./cmps/HomeScreenModal";

export class RootCmp extends React.Component {


  state = {
    isFirstEntry: sessionStorage.getItem('isFirstEntry')
  }


  render() {
    
    const {isFirstEntry} = this.state
    return (
      <div className="App main-container">
        <Header />
        <Navigation />
        {isFirstEntry !== 'notFirst' && <HomeScreenModal onToggleHomeModal={this.onToggleHomeModal} />}
        <main>
          <Switch>
            <Route component={UserProfile} path="/user/:id" />
            <Route component={StationDetails} path="/station/:id" />
            <Route component={LoginPage} path="/login" />
            <Route component={CreateStation} path="/newStation" />
            <Route component={Search} path="/search" />
            <Route component={Library} path="/library" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
        <AudioPlayer />
      </div>
    );
  }
  }
