import React from 'react';


import './App.css';

import Router from './router/public.js'
import index from './router/index.js'


function App() {
  return (
    <div className="App">
        <Router cont={index}></Router>
    </div>
  );
}

export default App;
