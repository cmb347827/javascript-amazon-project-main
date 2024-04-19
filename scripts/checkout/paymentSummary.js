import {cart} from '../../data/cart.js';                            //updated as part of challenge
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';


//right side of checkout page

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;

    cart.forEach((cartItem) => {
        const product= getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        
        const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents+= deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML=`
            <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
               $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
              $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
               $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
               $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML= paymentSummaryHTML; //.js-payment-summary did not exist in orderSummaryTest.js (div is now added, line 36)
}