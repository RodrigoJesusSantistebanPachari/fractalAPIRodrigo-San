import './App.css';
import {Col, Container, Row} from 'reactstrap';
import ListOrders from './ListOrders';
import OrderForm from './OrderForm';
import ProductForm from './ProductForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, Routes } from 'react-router-dom';


function App() {
  const [order, setOrders] = useState([]);
  const [orders, setOrder] = useState();

  const loadOrders = () => {
    axios.get('http://localhost:8080/orders').then(({data}) => setOrders(data));
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
    alert("Llegue aquí");
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
                <Link to="/my-orders" className="btn btn-secondary view-orders-btn">View My Orders</Link>
              </>
            } />
            <Route path="/my-orders" element={<ListOrders order={order} onDelete={deleteOrder} onEdit={(orders) => setOrder(orders)} />} />
            <Route path="/add-order" element={<OrderForm onSubmit={onSubmit} />} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

