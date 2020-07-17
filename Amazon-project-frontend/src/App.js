import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import allSameProduct from './components/allSameProduct'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
      <Route path="/" exact component={Home}/>
      <Route path='/allSameProduct/:id' component={allSameProduct}/>
      <Footer />
      </Router>
      
    </div>
  );
}

export default App;
