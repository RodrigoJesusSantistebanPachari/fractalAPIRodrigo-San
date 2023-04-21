import React from "react";

const CartItem = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text mb-0">Unit price: ${product.unitPrice}</p>
          <p className="card-text mb-0">Quantity: {product.qty}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div className="font-weight-bold">${product.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
