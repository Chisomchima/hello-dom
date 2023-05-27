
  // get the product div
  const products = document.querySelector(".products");
  const productContainer = document.querySelector(".product-container");
  const categories = document.querySelector(".categories");
  let jsonData = [];
  let basket = JSON.parse(localStorage.getItem("data")) || [];

  // fetch the products data from storeAPI
  async function fetchData() {
    try {
      // fetch the data from the api
      const response = await fetch("https://fakestoreapi.com/products");
      jsonData = await response.json();
      //add content to products div
      products.innerHTML = `
    ${jsonData
      .map((element) => {
        let search = basket.find((x) => x.id === element.id) || [];
        const description = element.description.slice(0, 40) + "...";
        const title = element.title.slice(0, 20) + "...";
        return `
         <div id="product-id-${
           element.id
         }" class="card col-3 p-3 m-3" style="height: 500px;">
              <img src="${
                element.image
              }" class="card-img-top" style="height: 60%; object-fit: contain;" alt="...">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
              <div class="price-quantity">
                <h2>$ ${element.price} </h2>
                <div class="buttons w-100">
                 <i onclick="decrement(${
                   element.id
                 })" class="bi bi-dash-lg"></i>
                 <div id="${element.id}" class="quantity">
                   ${search.item === undefined ? 0 : search.item}
                 </div>
                 <i onclick="increment(${
                   element.id
                 })" class="bi bi-plus-lg"></i>
                </div>
              </div>
              </div>
          </div>`;
      })
      .join("")}
    `;
    } catch (err) {
      console.log(err);
    }
  }

  fetchData();

  // increment the number in our cards
  let increment = (id) => {
    
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
      basket.push({
        id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    console.log(basket)
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  //decrement the number in our cards
  let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    console.log(basket, 'basket')
    localStorage.setItem("data", JSON.stringify(basket));
  };

  //update the number in our cards
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    console.log(document.getElementById(id).innerHTML )
    calculation();
  };

  // the calculates the aggregate ammount of products selected
  let calculation = () => {
    let cartIcon = document.querySelector(".canvas");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculation();

  // get categories
  async function getCategories() {
    try {
      // fetch the data from the api
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const jsonData = await response.json();
      // add content to products div
      categories.innerHTML = `
    ${jsonData
      .map((element) => {
        console.log(element);
        // Encode the params value
        return `
      <div onclick='getProductsByCat( "${element}" )' class="border p-4 bg-success rounded m-3 d-flex align-items-center justify-content-center" style="height:20px; color: white; cursor: pointer;">
              ${element}
      </div>`;
      })
      .join("")}
    `;
    } catch (err) {
      console.log(err);
    }
  }

  getCategories();

  async function getProductsByCat(params) {
    try {
      // Construct the URL with the encoded params
      let url = `https://fakestoreapi.com/products/category/${params}`;

      const response = await fetch(url);
      jsonData = await response.json();
      console.log(jsonData);

      products.innerHTML = `
    ${jsonData
      .map((element) => {
        const description = element.description.slice(0, 80) + "...";
        const title = element.title.slice(0, 20) + "...";
        return `
      <div class="card col-3 p-3 m-3" style="height: 500px;">
              <img src="${element.image}" class="card-img-top" style="height: 60%; object-fit: contain;" alt="...">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="#" class="btn btn-primary">View Product</a>
              </div>
            </div>`;
      })
      .join("")}
    `;
    } catch (err) {
      console.log(err);
    }
  }
