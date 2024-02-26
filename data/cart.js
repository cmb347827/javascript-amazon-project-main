export const cart =[];

export function addToCart(productId){
    let matchingItem;
        
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
      });
    }
  }