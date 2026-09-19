import { ShippingForm } from "./ShippingForm"; import { PaymentMethods } from "./PaymentMethods";
export function CheckoutForm() { return <div className="panel"><h2>Delivery details</h2><ShippingForm /><PaymentMethods /></div>; }
