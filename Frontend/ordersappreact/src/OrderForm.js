import React from "react";
import { AvForm, AvField, AvInput, AvGroup } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useRef } from "react";



const OrderForm = ({order, onSubmit}) => {

    let form = useRef();

    const _onSubmit = (values) => {
        alert("Llegue");
        alert(order);
        onSubmit(values);
        form.reset();
    }

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
                            <div className="card-header bg-primary text-white">{order ? 'Edit': 'New'} Order</div>
                            <div className="card-body">
                                <AvForm ref={c => (form = c)} onValidSubmit={(_, values) => _onSubmit(values)}>
                                    <AvGroup className="mb-3">
                                        Order number:
                                        <AvField name="orderNr" required value={order ? order.OrderNr: ''}/>
                                    </AvGroup> 
                                    <div className="text-center">
                                        <Button color="primary">{order ? 'Edit': 'New'} Order</Button>
                                    </div>
                                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderForm;
