import { getOrder, loadOrdersFetch } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  try {
    await loadProductsFetch();
    await loadOrdersFetch(); // Ensure orders are loaded

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    if (!orderId || !productId) {
      throw new Error('Missing orderId or productId in URL.');
    }

    const order = getOrder(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    const product = getProduct(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    const productDetails = order.products.find(details => details.productId === product.id);
    if (!productDetails) {
      throw new Error(`Product details for product ID ${product.id} not found in order ID ${order.id}.`);
    }

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

    if (!orderTime.isValid() || !deliveryTime.isValid()) {
      throw new Error('Invalid date format in order or delivery time.');
    }

    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    const clampedProgress = Math.min(Math.max(percentProgress, 0), 100); // Ensure it's between 0 and 100

    const trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryTime.format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${product.image}" alt="${product.name}">

      <div class="progress-labels-container">
        <div class="progress-label ${clampedProgress < 50 ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${(clampedProgress >= 50 && clampedProgress < 100) ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${clampedProgress >= 100 ? "current-status" : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${clampedProgress}%;"></div>
      </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  } catch (error) {
    console.error(error);
    document.querySelector('.js-order-tracking').innerHTML = `
      <p class="error">${error.message}</p>
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    `;
  }
}

loadPage();
