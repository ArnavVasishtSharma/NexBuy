import { renderOrderSummary } from '../scripts/Checkout/orderSummery.js'
import { renderPaymentSummery } from '../scripts/Checkout/paymentSummery.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

loadProducts(()=>{
renderOrderSummary();
renderPaymentSummery();
})
