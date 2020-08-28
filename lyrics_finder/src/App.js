import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Index from './components/layout/Index';
import Navbar from './components/layout/Navbar';
import { Provider } from './context';
import React from 'react';

function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
