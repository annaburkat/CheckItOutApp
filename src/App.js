import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import './fontawesome';


function App() {

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
