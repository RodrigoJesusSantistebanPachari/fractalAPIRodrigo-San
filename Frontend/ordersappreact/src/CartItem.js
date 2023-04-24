import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';


const CartItem = ({ product, orderID }) => {

  const [order, setOrders] = useState([]);

  
  const loadOrders = () => {
    if(product){
      alert("Deleted Product")
    }
    window.location.reload();
  }

  useEffect(setOrders, []);

  const deleteProduct = (productToDelete, orderId) => {
    axios.delete(`http://localhost:8080/orders/${orderId}/product/${productToDelete.id}`).then(() => loadOrders());
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="blackFont">{product.name}</h5>
          <p className="blackFont">Unit price: ${product.unitPrice}</p>
          <p className="blackFont">Quantity: {product.qty}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div className="font-weight-bold">Total: ${product.totalPrice}</div>
        </div>
        <button className="btn btn-danger" onClick={() => deleteProduct(product ,orderID)}>Delete Product</button>
      </div>
    </div>
  );
};

export default CartItem;

