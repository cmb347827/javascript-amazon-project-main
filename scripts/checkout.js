import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';    //runs all the code in a file without importing anyting.

renderOrderSummary();
renderPaymentSummary();