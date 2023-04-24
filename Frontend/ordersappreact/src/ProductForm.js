import React, { useState, useRef, useEffect } from "react";
import { AvForm, AvField, AvInput, AvGroup } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import App from './App';




const ProductForm = () => {

    const [order, setOrders] = useState([]);
    const [orders, setOrder] = useState();
    const loadOrders = () => {
        axios.get('http://localhost:8080/orders').then(({data}) => setOrders(data));
      }

    const location = useLocation();
    const ord = new URLSearchParams(location.search).get('ord');

    const form = useRef();
    
    const handleSubmit = (values) => {
    axios
      .put(`http://localhost:8080/orders/${ord}/product`, values)
      .then(() => {
        alert("Product added");
        loadOrders();
        window.location.reload();
      });
  };

  return (
        <div className="text-center">

            <div className="banner d-flex justify-content-between">

                <Link to="/" className="btn btn-secondary mr-auto">Return to index</Link>
                    <h1 class="mx-auto">API For Fractal</h1>

                <Link to="/my-orders"className="btn btn-success ml-auto">View my orders</Link>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-primary">
                            <div className="card-header bg-primary text-white">New Product</div>
                            <div className="card-body">
                                <AvForm ref={form} onValidSubmit={(_, values) => handleSubmit(values)}>
                                    <AvGroup className="mb-3">
                                        Product name:
                                        <AvField name="name"/>
                                    </AvGroup> 
                                    <AvGroup className="mb-3">
                                        Unit Price:
                                        <AvField name="unitPrice" type="number"/>
                                    </AvGroup> 
                                    <AvGroup className="mb-3">
                                        Quantity of products:
                                        <AvField name="qty" type="number"/>
                                    </AvGroup> 
                                    <div className="text-center">
                                        <Button color="primary">New Product</Button>
                                    </div>
                                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
