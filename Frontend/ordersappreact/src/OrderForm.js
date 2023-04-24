import React from "react";
import { AvForm, AvField, AvInput, AvGroup } from "availity-reactstrap-validation";
import { Label, Button } from 'reactstrap';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useRef } from "react";



const OrderForm = ({order, onSubmit}) => {

    let form = useRef();

    const _onSubmit = (values) => {
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
                            <div className="card-header bg-primary text-white">Add/Edit Order</div>
                            <div className="card-body">
                                <AvForm ref={c => (form = c)} onValidSubmit={(_, values) => _onSubmit(values)}>
                                    <AvGroup className="mb-3">

                                    <Label for="status">Status:</Label>
                                    <AvField type="select" name="status" id="status">
                                    <option value="0">Pending</option>
                                    <option value="1">In Progress</option>
                                    <option value="2">Completed</option>
                                    </AvField>

                                        Order number:
                                        <AvField name="orderNr" required value={order ? order.OrderNr: ''}/>
                                    </AvGroup> 
                                    <div className="text-center">
                                        <Button color="primary">Add/Edit Order</Button>
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

