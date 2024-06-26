export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  //empty cart from cartTest.js , is falsy
  //(!cart) becomes truthy???
  if(!cart){
      cart=[{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity:2,
          deliveryOptionId:'1'
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity:1,
          deliveryOptionId:'2'
      }];
      console.log('but is not in loadfromstorage');
  }
}
function saveToStorage(){
    //whenever the cart is updated , will be saved in local storage.
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
    console.log('cart',cart, 'productid',productId);   
    //loop to see if item is already in cart
    cart.forEach((cartItem)=>{
      console.log('cart isn\'t empty and item is in cart');
      if(productId===cartItem.productId){
         matchingItem=cartItem;
      }
    });
    
    if(matchingItem){
      console.log('as is visible here');
      //item.quantity+=1 below line 66 increases the quantity for each individually added same item.
      //item is an object, so copied to matchingItem, matchingItem is an object, can add properties:quantity.
      matchingItem.quantity+=1;
  
    }else{
      //item is not yet in cart.
      console.log('item is not yet in cart');
      cart.push({
        productId,
        quantity: 1,
        deliveryOptionId:'1'
      });
    }
  saveToStorage();
}

export function removeFromCart(productId){
    const newCart=[];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
           newCart.push(cartItem);
        }
    })
    cart=newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    //update item's in cart shipping delivery option if shipping selected is changed.
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
         matchingItem=cartItem;
      }
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
}