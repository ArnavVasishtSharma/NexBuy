import { renderOrderSummary } from '../scripts/Checkout/orderSummery.js'
import { renderPaymentSummery } from '../scripts/Checkout/paymentSummery.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import {  loadProductsFetch} from '../data/products.js';
import { loadCart,loadCartFetch } from '../data/cart.js';


async function loadPage(){
   

   await loadProductsFetch()

   await loadCartFetch();
   renderOrderSummary();
   renderPaymentSummery();

}
loadPage();
/*
Promise.all([
   loadProductsFetch(),
   new Promise((resolve)=>{
      loadCart(()=>{
         resolve();
      });  
   })

]).then(()=>{
   renderOrderSummary();
   renderPaymentSummery();
})
/*
new Promise ((resolve)=>{
   loadProducts(()=>{
    resolve();
   });


}).then(()=>{
return new Promise((resolve)=>{
   loadCart(()=>{
      resolve();
   });
});  


}).then(()=>{
   renderOrderSummary();
   renderPaymentSummery();
})
/*
loadProducts(()=>{
  loadCart(()=>{
   renderOrderSummary();
   renderPaymentSummery();
  }) 

});
*/


