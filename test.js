// // const parent = document.querySelector(".parent");
// // const appendbtn = document.querySelector(".append");
// // const removebtn = document.querySelector(".remove");
// // const stylebtn = document.querySelector(".style");
// // const childElement = document.createElement("p");
// // childElement.textContent = "hi there";

// // appendbtn.addEventListener("click", function () {
// //   parent.appendChild(childElement);
// // });

// // removebtn.addEventListener("click", function () {
// //   parent.removeChild(childElement);
// // });

// // stylebtn.addEventListener("click", function () {
// //   childElement.style.color = "red";
// // });

// // // Get the form element
// // // const form = document.getElementById("myForm");
// // // const reset = document.getElementById("reset");
// // // const errors = document.querySelector(".error");
// // // Add event listener for form submission
// // // form.addEventListener("submit", function (event) {
// // //   let errorTitle = [];
// // //   // Prevent form submission
// // //   event.preventDefault();

// // //   // Validate form inputs
// // //   const nameInput = document.getElementById("name");
// // //   const emailInput = document.getElementById("email");
// // //   const passwordInput = document.getElementById("password");

// // //   // Check if inputs are filled
// // //   if (!nameInput.value) {
// // //     errorTitle.push(" Name cannot be blank");
// // //     errors.textContent = errorTitle.join("");
// // //     errors.style.color = "red";
// // //     console.log(errors);
// // //   }
// // //   if (!emailInput.value) {
// // //     errorTitle.push(" email cannot be blank");
// // //     errors.textContent = errorTitle.join("");
// // //     errors.style.color = "red";
// // //     console.log(errors);
// // //   }
// // //   let stringifiedpassword = String(passwordInput.value);
// // //   console.log(stringifiedpassword, passwordInput);
// // //   if (stringifiedpassword.length < 5 || !stringifiedpassword) {
// // //     errorTitle.push("passwords should be greater than 5");
// // //     errors.textContent = errorTitle.join("");
// // //     errors.style.color = "red";
// // //     console.log(errors);
// // //   }
// // //   // Submit the form if all validations pass

// // //   alert("Form submitted successfully!");
// // //   form.reset();
// // // });

// // // reset.addEventListener("click", function () {
// // //   form.reset();
// // // });

// // // Get the form element
// // const form = document.getElementById('cardForm');

// // // Get the card container element
// // const cardContainer = document.getElementById('cardContainer');

// // // Add event listener for form submission
// // form.addEventListener('submit', function(event) {
// //   event.preventDefault();

// //   // Get form values
// //   const titleInput = document.getElementById('title');
// //   const descriptionInput = document.getElementById('description');

// //   // Create card element
// //   const card = document.createElement('div');
// //   card.className = 'col-md-4 mb-3';

// //   // Create card body element
// //   const cardBody = document.createElement('div');
// //   cardBody.className = 'card';

// //   // Create card content
// //   const cardTitle = document.createElement('h5');
// //   cardTitle.className = 'card-title';
// //   cardTitle.textContent = titleInput.value;

// //   const cardDescription = document.createElement('p');
// //   cardDescription.className = 'card-text';
// //   cardDescription.textContent = descriptionInput.value;
// // {/* <div class="card">
// // <h5>${titleInput.value}</h5>
// // <p>${descriptionInput.value}</p>
// // </div> */}

// //   // Append card content to card body
// //   cardBody.appendChild(cardTitle);
// //   cardBody.appendChild(cardDescription);

// //   // Append card body to card
// //   card.appendChild(cardBody);

// //   // Append card to card container
// //   cardContainer.appendChild(card);

// //   // Reset form inputs
// //   titleInput.value = '';
// //   descriptionInput.value = '';
// // });

// // /// atribute manipulations
// // const element = document.getElementById("myElement");
// // const image = document.querySelectorAll('img');
// // image.forEach((el) => {
// //   el.setAttribute('src', 'data:image/jpeg;base64,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')
// // })

// // const imgSrc = image.getAttribute('src');
// // console.log("imgSrc: ", imgSrc)

// // element.setAttribute('class', 'myClass2');
  
// // // Set the "data-value" attribute
// // element.setAttribute('data-value', '');

// // element.setAttribute('id', 'myElement2');

// // // Get the value of the "id" attribute
// // const id = element.getAttribute("id");
// // console.log("ID:", id); // Output: ID: myElement

// // // Get the value of the "class" attribute
// // const className = element.getAttribute("class");
// // console.log("Class:", className); // Output: Class: myClass


// // // Get the value of the "data-value" attribute
// // const dataValue = element.getAttribute("data-value");
// // console.log("Data Value:", dataValue); // Output: Data Value: 123
// //  // Set the "class" attribute


// //  const hasClass = element.hasAttribute('class');
// //  console.log('Has Class:', hasClass); // Output: Has Class: true
 
// //  // Check if the "data-value" attribute exists
// //  const hasDataValue = element.hasAttribute('data-value');
// //  console.log('Has Data Value:', hasDataValue); // Output: Has Data Value: true

// //  element.removeAttribute('class')
// //  console.log(element)










// //on change Events Input Fields (Text, Email, etc.):
// const input = document.getElementById("myInput");

// input.addEventListener("change", function (event) {
//   const value = event.target.value;
//   console.log("Input value changed:", value);
//   // Perform actions based on the changed value
// });

// //checkboxes
// const checkbox = document.getElementById("myCheckbox");

// checkbox.addEventListener("change", function (event) {
//   const checked = event.target.checked;
//   console.log("Checkbox checked:", checked);
//   // Perform actions based on the checkbox state
// });

// // radio buttons
// const radioButtons = document.querySelectorAll('input[type="radio"]');

// radioButtons.forEach(function (radio) {
//   radio.addEventListener("change", function (event) {
//     const selectedValue = event.target.value;
//     console.log("Radio button checked:", event.target.checked);
//     console.log("Radio button selected:", selectedValue);
//     // Perform actions based on the selected radio button
//   });
// });

// //select dropdowns
// const select = document.getElementById("mySelect");

// select.addEventListener("change", function (event) {
//   const selectedValue = event.target.value;
//   console.log("Select option selected:", selectedValue);
//   // Perform actions based on the selected option
// });

const myName = 'chisom chima'
const myObj = {
  name: 'chisom',
  age: 25,
  job: 'student'
}
const myObj2 = {
  // name: 'chisom',
  // age: 25,
  // job: 'student',
  class:'year 2'
}
const pets = ['dog', 'cat', 'horse', 'bird']

// Storing data in localStorage
sessionStorage.setItem('name', myName);

// localStorage.removeItem('name');

sessionStorage.setItem('myObj', JSON.stringify(myObj2));

sessionStorage.setItem('pets', JSON.stringify(pets));

// Retrieving data from localStorage
var value = sessionStorage.getItem('name');
console.log(value, 'value')

// JSON.parse()
// JSON.stringify()
// localStorage.clear();
const getObj = sessionStorage.getItem('myObj')
const getPets = sessionStorage.getItem('pets')
const objData = JSON.parse(getPets)
console.log(objData)

// console.log(typeof(getPets))

// Removing an item from localStorage
// localStorage.removeItem('key');

// Clearing all data from localStorage


// // Storing data in sessionStorage
// sessionStorage.setItem('key', 'value');

// // Retrieving data from sessionStorage
// var value = sessionStorage.getItem('key');

// // Removing an item from sessionStorage
// sessionStorage.removeItem('key');

// // Clearing all data from sessionStorage
// sessionStorage.clear();

