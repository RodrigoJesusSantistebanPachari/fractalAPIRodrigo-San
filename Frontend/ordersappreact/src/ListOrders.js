import React from "react";
import CartItem from "./CartItem";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';



const ListOrders = ({order}) => {
    return (
        <>
        <div className="text-center">


                <div className="banner d-flex justify-content-between">
                <Link to="/" className="btn btn-secondary mr-auto">Volver</Link>
                <h1 class="mx-auto">API For Fractal</h1>
                    <button className="btn btn-success ml-auto">Create Order</button>
                </div>


        <h3 className="mb-3"> List of orders: </h3>
        {
            order.map(orders =>
            <div className="mb-3 border rounded p-3" key={orders.id}>
                <div className="mb-3 border rounded p-3" key={order.id}>
                    <p>Order number: {orders.orderNr}</p>
                    <p>Date: {orders.date}</p>
                    <p>Final price: {orders.finalPrice}</p>
                    <p>Number of products: {orders.nproducts}</p>
                    
                    <div className="mt-3 d-flex justify-content-center">
                        {orders.products.map((product) => (
                        <CartItem key={product.id} product={product} />
                        ))}
                    </div>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                    
                </div>
            </div>    
            )
        } 
        </div>
        </>   
    );
}

export default ListOrders;
