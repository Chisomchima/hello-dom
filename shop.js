// get the product div

const products = document.querySelector(".products");

// fetch the products data from storeAPI
async function fetchData() {
  try {
    // fetch the data from the api
    const response = await fetch("https://fakestoreapi.com/products");
    const jsonData = await response.json();
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
      }).join("")
    }
    `;
  } catch (err) {
    console.log(err);
  }
}

fetchData();
