// attentive installed via theme settings > code snippets
!function(w){w.attn_d0x0b_evt=[];var n=w.attentive={analytics:{}},a=['enable','disable','track','pageView','productView','addToCart','purchase'];function e(n){return function(){w.attn_d0x0b_evt.push({func:n,args:arguments})}}for(var i=0,c=a.length;i<c;i++)n.analytics[a[i]]=e(a[i])}(window)

// product view
analytics.subscribe('product_viewed', (event) => {
  window.attentive.analytics.productView({
    items:[
      {
        productId: event.data.productVariant.product.id,
        productVariantId: event.data.productVariant.id,
        name: event.data.productVariant.title,
        productImage: event.data.productVariant.image,
        price: {
          value: event.data.productVariant.price.amount,
          currency: event.data.productVariant.price.currencyCode,
        },
        quantity: 1,
      }
    ]
  })
});

// added to cart
analytics.subscribe("product_added_to_cart", (event) => {
  window.attentive.analytics.addToCart({
    items:[
      {
        productId: event.data.cartLine.merchandise.product.id,
        productVariantId: event.data.cartLine.merchandise.id,
        name: event.data.cartLine.merchandise.title,
        productImage: event.data.cartLine.merchandise.image,
        price: {
          value: event.data.cartLine.cost.totalAmount.amount,
          currency: event.data.cartLine.cost.totalAmount.currencyCode,
        },
        quantity: 1,
      }
    ]
  })
});