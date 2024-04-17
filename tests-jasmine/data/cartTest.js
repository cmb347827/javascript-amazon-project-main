import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart',()=>{
  //tests the if statement
  it('adds an existing item to cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      }])
    });
    loadFromStorage();  //first console.logs: but is not in loadfromstorage  (cart.js)
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); //second console.logs: [] productid e43638ce-6aa0-4b85-b27f-e1d07eb678c6"  (cart.js) //third console.logs: item is not yet in cart' (cart.js)
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  //test the else statement
  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([])
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); //fourth console.logs: cart[{...}] productid e43638ce-6aa0-4b85-b27f-e1d07eb678c6  //fifth console.log: 'cart isn\'t empty and item is in cart (cart.js) //sixth console.logs: as is visible here (cart.js)
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});