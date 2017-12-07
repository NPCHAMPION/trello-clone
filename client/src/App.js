import React, { Component } from 'react';
import { MainLayout } from './layout/main/main';
import { Board } from './components/board/Board';

import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout>
          <Board url='/api/' />
        </MainLayout>
      </div>
    );
  }
}

export default App;
