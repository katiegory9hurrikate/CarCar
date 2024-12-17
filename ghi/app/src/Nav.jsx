import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Inventory Dropdown */}
            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter('inventory')} onMouseLeave={handleMouseLeave}>
              <NavLink className="nav-link dropdown-toggle" to="/inventory">Inventory</NavLink>
              {activeDropdown === 'inventory' && (
                <ul className="dropdown-menu show">
                  <li><NavLink className="dropdown-item" to="/inventory">Automobiles</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/inventory/unsold">Unsold Automobiles</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/inventory/new">Create an Automobile</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/manufacturers/new">Create a Manufacturer</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/models">Models</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/models/new">Create a Model</NavLink></li>
                </ul>
              )}
            </li>

            {/* Sales Dropdown */}
            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter('sales')} onMouseLeave={handleMouseLeave}>
              <NavLink className="nav-link dropdown-toggle" to="/sales">Sales</NavLink>
              {activeDropdown === 'sales' && (
                <ul className="dropdown-menu show">
                  <li><NavLink className="dropdown-item" to="/sales">Sales History</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/sales/new">Create a Sale</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/inventory/unsold">Unsold Inventory</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/salespeople/new">Create a Salesperson</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/salespeople/history">Salesperson History</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/customers/new">Create a Customer</NavLink></li>
                </ul>
              )}
            </li>

            {/* Service Dropdown */}
            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter('service')} onMouseLeave={handleMouseLeave}>
              <NavLink className="nav-link dropdown-toggle" to="/appointments">Service</NavLink>
              {activeDropdown === 'service' && (
                <ul className="dropdown-menu show">
                  <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/appointments/new">Create a Service Appointment</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/technicians/new">Add a Technician</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
