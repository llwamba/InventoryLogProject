import React from 'react';
import './App.css';
import { Home } from './Home';
import { Vendor } from './Vendor';
import { Item } from './Item';
import { InventoryLog } from './InventoryLog';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Inventory App
        </h3>
          
        <nav className="navbar navbar-expand-sm bg-secondary navbar-dark px-5">
          <ul className="navbar-nav px-5">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary mx-5" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary mx-5" to="/vendor">
                Vendors List
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary mx-5" to="/item">
                Items List
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary mx-5" to="/inventoryLog">
                Inventory Log
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/vendor' element={<Vendor/>}/>
          <Route path='/item' element={<Item/>}/>
          <Route path='/inventoryLog' element={<InventoryLog/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
