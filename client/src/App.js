import React, { Component } from 'react';
import { MainLayout } from './layout/main/main';
import { BoardContainer } from './components/boardContainer/boardContainer';

import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout>
          <BoardContainer url='/api/' />
        </MainLayout>
      </div>
    );
  }
}

export default App;
