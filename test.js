// getElementById()
// let myElement = document.getElementById("second-div");

//getElementsByClassName()
let myClassElement = document.getElementsByClassName('content-div');

//getElementsByTagName()
let myTagNameElements = document.getElementsByTagName('div')

// looping through htmlcollections
Array.from(myClassElement).forEach((el) => {
    // console.log(el, 'my class elements')
})

// query selectors
// let myElement2 = document.querySelector("#first-div");

let myElements = document.querySelectorAll(".content-div");
console.log(myElements)

let myDivs = document.querySelectorAll("#books li:nth-child(2) .name");

// looping through NodeList
myElements.forEach((el) => {
    // console.log(el, 'my queryselector elements')
})


// text content (textContent)
let myElement2 = document.querySelector("#first-div");
myElement2.textContent += ' i like cats'
// console.log(myElement2, myElement2.textContent)

let myElement = document.getElementById("second-div");
myElement.textContent += ' i love dogs'
// console.log(myElement, myElement.textContent)


// innerHTML 
let inner = document.querySelector('#first-div')
inner.innerHTML = "<ul><li>list 1</li> <li>list 2</li></ul>"
console.log(inner)


/// rendering products on the page

// get the post div
// const products = document.querySelector(".products");

// // fetch the posts from our api
// async function fetchData() {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products", {
//       method: "GET",
//       /* or POST/PUT/PATCH/DELETE */
//     });
//     const jsonData = await response.json();
//     console.log(jsonData);
//     products.innerHTML = `
//     ${jsonData.map((element) => {
//       // console.log(element);
//       const description = element.description.slice(0, 80) + "...";
//       const title = element.title.slice(0, 20) + "...";
//       return `
//         <div class="card col-3 p-3 m-3" style="height: 500px;">
//         <img src="${element.image}" class="card-img-top" style="height: 60%; object-fit: contain;" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${title}</h5>
//           <p class="card-text">${description}</p>
//           <a href="#" class="btn btn-primary">View Product</a>
//         </div>
//       </div>`;
//     })
//       .join("")}
//     `;
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchData();


// event listeners click
const button = document.getElementById('myButton');

button.addEventListener('click', function(e) {
  console.log('Button clicked!', e);
  if(e.shiftKey === true){
    alert('shift key was pressed')
  }
});

// In this example, when the button is clicked, the function specified as the event handler is executed, and it logs the message "Button clicked!" to the console.

// keydown
const input = document.getElementById('myInput');
input.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event);
});

//mouseOver
const element = document.getElementById('myElement');

function handleMouseOver(event) {
  // Code to be executed when the mouseover event occurs
  console.log('Mouse over event occurred!');
  console.log('Target element:', event.target);
}

element.addEventListener('mouseover', handleMouseOver);


// create new elements
const newElement = document.createElement('div');

//append child
parentElement.appendChild(newElement);
