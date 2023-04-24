import React from "react";
import CartItem from "./CartItem";

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


const ListPendingOrders = ({order, loadPendingOrders, status }) => {

    loadPendingOrders();
    return (
        <>
        <div className="text-center">

                <div className="banner d-flex justify-content-between">

                <Link to="/" className="btn btn-secondary mr-auto">Return</Link>
                    <h1 class="mx-auto">API For Fractal</h1>

                <Link to="/add-order" className="btn btn-success ml-auto">Create Order</Link>
                </div>


        <h3 className="mb-3"> {status} orders: </h3>
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

export default ListPendingOrders;