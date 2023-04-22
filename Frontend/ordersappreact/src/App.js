import './App.css';
import {Col, Container, Row} from 'reactstrap';
import ListOrders from './ListOrders';
import OrderForm from './OrderForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, Routes } from 'react-router-dom';


function App() {

  const [order, setOrders] = useState([]);

  const loadOrders = () => {
    axios.get('http://localhost:8080/orders').then(({data}) => setOrders(data));
  }

  useEffect(loadOrders, []);

  return (
    <div className="app-container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Welcome to the project of Rodrigo Santisteban for Fractal! Want to see the orders?</h1>
            <button className="btn btn-secondary view-orders-btn"><Link to="/my-orders">View My Orders</Link></button>
          </>
        }/>
        <Route path="/my-orders" element={<ListOrders order={order} />} />
        <Route path="/add-order" element={<OrderForm />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

