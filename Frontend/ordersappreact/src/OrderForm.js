import React from "react";
import { AvForm, AvField, AvInput, AvGroup } from "availity-reactstrap-validation";

const OrderForm = () => {
    return (
        <>
            <h3 className="mb-3">New Order</h3>
            <AvForm>
                <AvGroup className="mb-3">
                    <p>Nombre:</p><AvField name = "nombre" required />
                </AvGroup>
            </AvForm>
        </>
    );
}

export default OrderForm;
