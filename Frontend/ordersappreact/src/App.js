import './App.css';
import {Col, Container, Row} from 'reactstrap';
import ListOrders from './ListOrders';
import OrderForm from './OrderForm';
import ProductForm from './ProductForm';
import ListPendingOrders from './ListPendingOrders';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, Routes } from 'react-router-dom';


function App() {
  const [order, setOrders] = useState([]);
  const [orders, setOrder] = useState();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);




  const loadOrders = () => {
    axios.get('http://localhost:8080/orders').then(({data}) => setOrders(data));
  }

  const loadPendingOrders = () => {
    axios.get('http://localhost:8080/orders/pending').then(({data}) => setPendingOrders(data));
  }

  const loadInProgressOrders = () => {
    axios.get('http://localhost:8080/orders/inprogress').then(({data}) => setInProgressOrders(data));
  }

  const loadCompletedOrders = () => {
    axios.get('http://localhost:8080/orders/completed').then(({data}) => setCompletedOrders(data));
  }

  useEffect(loadOrders, []);


  const onSubmit = (values) => {
    if (orders) {
      alert(orders.id);
      axios.put(`http://localhost:8080/orders/${orders.id}`, values).then(() => {
        setOrder();
        loadOrders();
      });
    } else {
      axios.post('http://localhost:8080/orders', values).then(() => loadOrders())
    }
  }

  const deleteOrder = (orderToDelete) => {
    axios.delete(`http://localhost:8080/orders/${orderToDelete.id}`).then(() => loadOrders());
  }

  const onAddProduct = (orderToAddProduct, values) => {
    axios.put(`http://localhost:8080/orders/${orderToAddProduct.id}/product`, values).then(() => {
      setOrder();
      loadOrders();
    });
  }

  return (
    <div className='text-center'>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <div className="banner d-flex justify-content-between">
                  <h1 class="mx-auto">API For Fractal</h1>
                </div>
                <h4>Welcome to the project of Rodrigo Santisteban for Fractal! Want to see the orders?</h4>
                <div className="button-container">
                  <Link to="/my-orders" className="btn btn-primary view-orders-btn big-button">View My Orders</Link>
                  <Link to="/pending-orders" className="btn btn-dark view-orders-btn big-button">View Pending Orders</Link>
                  <Link to="/completed-orders" className="btn btn-success view-orders-btn big-button">View Completed Orders</Link>
                  <Link to="/inprogress-orders" className="btn btn-danger view-orders-btn big-button">View In Progress Orders</Link>
                </div>
              </>
            } />
            <Route path="/my-orders" element={<ListOrders order={order} onDelete={deleteOrder} onEdit={(orders) => setOrder(orders)} />} />
            <Route path="/pending-orders" element={<ListPendingOrders order={pendingOrders} loadPendingOrders={loadPendingOrders} status={"Pending"}/>} />
            <Route path="/completed-orders" element={<ListPendingOrders order={completedOrders} loadPendingOrders={loadCompletedOrders} status={"Completed"}/>} />
            <Route path="/inprogress-orders" element={<ListPendingOrders order={inProgressOrders} loadPendingOrders={loadInProgressOrders} status={"In Progress"}/>} />
            <Route path="/add-order" element={<OrderForm onSubmit={onSubmit} />} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
