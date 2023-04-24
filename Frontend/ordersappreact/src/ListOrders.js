import React from "react";
import CartItem from "./CartItem";
import ProductForm from './ProductForm';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


const ListOrders = ({order, onDelete, onEdit }) => {

    return (
        <>
        <div className="text-center">

                <div className="banner d-flex justify-content-between">

                <Link to="/" className="btn btn-secondary mr-auto">Return</Link>
                    <h1 class="mx-auto">API For Fractal</h1>

                <Link to="/add-order" className="btn btn-success ml-auto">Create Order</Link>
                </div>


        <h3 className="mb-3"> List of orders: </h3>
        {order ? (
            order.map(orders =>
            <div className="mb-3 border rounded p-3" key={orders.id}>
                <div className="mb-3 border rounded p-3" key={order.id}>
                    <p>Order number: {orders.orderNr}</p>
                    {orders.status === 0 && <p>Status: Pending</p>}
                    {orders.status === 1 && <p>Status: In Progress</p>}
                    {orders.status === 2 && <p>Status: Completed</p>}
                    <p>Date: {orders.date.split('T')[0]}</p>
                    <p>Time: {orders.date.slice(11,19)}</p>
                    <p>Final price: ${orders.finalPrice}</p>
                    <p>Number of products: {orders.nproducts}</p>
                    
                    <div className="mt-3 d-flex justify-content-center">
                        {orders.products && orders.products.map((product) => (
                            <CartItem key={product.id} product={product} orderID={orders.id} />
                        ))}
                    </div>
                    <Link to={{pathname: '/add-product', search: `?ord=${orders.id}`}} className="btn btn-warning">Add New Product</Link>
                    <Link to="/add-order" className="btn btn-primary"  onClick={() => onEdit(orders)}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => onDelete(orders)}>Delete</button>
                    
                </div>
            </div>    
            ))
            : (
            <p>No orders found.</p>
            
        )}
        </div>
        </>   
    );
}

export default ListOrders;
