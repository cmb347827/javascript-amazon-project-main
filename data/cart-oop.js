function Cart(localStorageKey){
  const cart={
    cartItems:undefined,
    loadFromStorage(){
         this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); //changed cart to cart-oop so doesn't affect original cart.
         //empty cart from cartTest.js , is falsy
         //(!cart) becomes truthy???
         if(!this.cartItems){
             this.cartItems=[{
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
     },
     saveToStorage(){
         //whenever the cart is updated , will be saved in local storage.
         localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
     },
     addToCart(productId){
         let matchingItem;
         console.log('cart',cart, 'productid',productId);   
         //loop to see if item is already in cart
         this.cartItems.forEach((cartItem)=>{
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
           this.cartItems.push({
             productId,
             quantity: 1,
             deliveryOptionId:'1'
           });
         }
       this.saveToStorage();
     },
     removeFromCart(productId){
         const newCart=[];
     
         this.cartItems.forEach((cartItem)=>{
             if(cartItem.productId !== productId){
                newCart.push(cartItem);
             }
         })
         this.cartItems=newCart;
         this.saveToStorage();
     },
     updateDeliveryOption(productId,deliveryOptionId){
         //update item's in cart shipping delivery option if shipping selected is changed.
         let matchingItem;
         this.cartItems.forEach((cartItem)=>{
           if(productId===cartItem.productId){
              matchingItem=cartItem;
           }
         });
         matchingItem.deliveryOptionId=deliveryOptionId;
         this.saveToStorage();
     }
    
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart= new Cart('cart-business'); //constructor function : with or without new. caleb curry 72.

cart.loadFromStorage();



businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);