
let productsHTML='';

products.forEach((product)=>{
   productsHTML +=`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents /100).toFixed(2)}
        </div>

        <div>
          <select id='item-quantity'>
            <option selected value="1">1</option>
            <option  value="2">2</option>
            <option  value="3">3</option>
            <option  value="4">4</option>
            <option  value="5">5</option>
            <option  value="6">6</option>
            <option  value="7">7</option>
            <option  value="8">8</option>
            <option  value="9">9</option>
            <option  value="10">10</option>
          </select>
        </div> 

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button data-product-id='${product.id}' class="add-to-cart-button button-primary js-add-to-cart">
          Add to Cart
        </button>
      </div>
   `;
});

document.querySelector('.js-products-grid').innerHTML= productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
   button.addEventListener('click',()=>{
      const productId= button.dataset.productId;
      let matchingItem;
      let cartQuantity=0;
      //loop to see if item is already in cart
      cart.forEach((item)=>{
        console.log('cart isn\'t empty and item is in cart');
        if(productId===item.productId){
           matchingItem=item;
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
      
      cart.forEach((item)=>{
         cartQuantity+=item.quantity;
      });
      
      document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
   });
});
