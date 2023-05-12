// get the product div
const products = document.querySelector(".products");
const productContainer = document.querySelector(".product-container");
const categories = document.querySelector(".categories");
let jsonData = [];
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

fetchData();

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
        console.log(element)
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

