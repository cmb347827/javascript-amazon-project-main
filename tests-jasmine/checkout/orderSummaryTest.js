import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage,cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary',()=>{
    const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
    //hook,is a shortcut.Will be run before each test.Great way to share code between tests and remove duplication.
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML=`
            <div class='js-order-summary'></div>
            <div class='js-payment-summary'></div>
       `;
        //recommended not to modify localStorage in our test.Should mock localStorage setItem in test.
        spyOn(localStorage,'setItem')

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity:2,
                deliveryOptionId:'1'
            },{
                productId: productId2,
                quantity:1,
                deliveryOptionId:'2'
            }]);
        });
        loadFromStorage();
        renderOrderSummary(); 
    });

    //test how the page looks (view)
    it('displays the cart',()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');//space matters in toContain is used because of other spans
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    });


    //test how the page behaves(controller)
    it('Removes a product',()=>{
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);//after delete of product 1
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);//after delete product 1
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);//product 2 should still be there.
        //is the cart array updated?
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML=` `;//end of test cleanup
    });
});