   let label = document.getElementById("label");
  let ShoppingCart = document.getElementById("shopping-cart");
  
 
 // increment the number in our cards
  let incrementcart = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
      basket.push({
        id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    generateCartItems();
    updatecart(id);
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount()
  };

  //decrement the number in our cards
  let decrementcart = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    generateCartItems();
    updatecart(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount()
  };

  //update the number in our cards
  let updatecart = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };



  // this function loads the cards in our cart component
  let generateCartItems = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    jsonData = await response.json();

    if (basket.length > 0) {
      return (ShoppingCart.innerHTML = basket
        .map((x) => {
          let { id, item } = x;
          let search = jsonData.find((y) => y.id === id) || [];
          console.log(search, "search");
          return `
      <div class="cart-item w-100 my-3">
        <img width="100" src=${search.image} alt="" />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrementcart(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="incrementcart(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
        })
        .join(""));
    } else {
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
    <h2>You Have An Empty Basket</h2>
    `;
    }
  };

  generateCartItems();

  let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
  };

  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
  };

  let TotalAmount = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    jsonData = await response.json();
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = jsonData.find((y) => y.id === id) || [];

          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      console.log(amount);
      label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
    } else return;
  };

  TotalAmount();