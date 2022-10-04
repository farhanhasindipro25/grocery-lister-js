// Grocery constructor function

function Grocery(id, name, quantity, price) {
  this.id = id;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}

// UI constructor function

function UI() {}

// ADD GROCERY LIST function to UI Prototype
UI.prototype.addGroceryToList = function (grocery) {
  // Adding a grocery to the list
  const groceryList = document.getElementById("grocery-list");

  // Create a tr element
  const listRow = document.createElement("tr");
  // Insert Columns inside the row
  listRow.innerHTML = `
    <td>${grocery.id}</td>
    <td>${grocery.name}</td>
    <td>${grocery.quantity}</td>
    <td>${grocery.price}</td>
    <td><a href=# class="delete-grocery-item text-decoration-none text-danger fw-bold">X</a> </td>
    `;
  groceryList.appendChild(listRow);
};

// DELETE GROCERY FROM LIST function to UI prototype
UI.prototype.deleteGroceryFromList = function (target) {
  if (target.className === "delete-grocery-item text-decoration-none text-danger fw-bold") {
    target.parentElement.parentElement.remove();
  }
};

// CLEAR INPUT FIELDS function to UI Prototype
UI.prototype.clearInputFields = function () {
  document.getElementById("grocery-id").value = "";
  document.getElementById("grocery-name").value = "";
  document.getElementById("grocery-quantity").value = "";
  document.getElementById("grocery-price").value = "";
};

// SHOW ALERT function to UI prototype
UI.prototype.showAlert = function (msg, className) {
  // Make a div, create a text node with the message, add the classname, target the container, add the div inside the container before the form, make the div disappear after 3 seconds.

  // Create div element
  const alertDiv = document.createElement("div");

  // Add a class
  alertDiv.className = `alert ${className}`;
  const alertMSG = document.createTextNode(msg);
  alertDiv.appendChild(alertMSG);

  // container
  const container = document.getElementById("grocery-form-container");
  // form
  const form = document.getElementById("grocery-form");

  // Insert the div inside container before the form
  container.insertBefore(alertDiv, form);

  // Make newly created div disapper after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Event listener to add a grocery
document
  .getElementById("grocery-form")
  .addEventListener("submit", function (e) {
    // Get form values
    const id = document.getElementById("grocery-id").value;
    const name = document.getElementById("grocery-name").value;
    const quantity = document.getElementById("grocery-quantity").value;
    const price = document.getElementById("grocery-price").value;

    // console.log(id, name, quantity, price);

    // Instantiate a grocery object
    const grocery = new Grocery(id, name, quantity, price);

    // Instantiate UI Object
    const ui = new UI();
    // Checking for empty input fields
    if (id === "" || name === "" || quantity === "" || price === "") {
      ui.showAlert("Input fields cannot be empty!", "text-danger");
    } else {
      ui.addGroceryToList(grocery);
      ui.showAlert(
        "Grocery item successfully added to the list!",
        "text-success"
      );
      ui.clearInputFields();
    }

    e.preventDefault();
  });

// Event listener to delete a grocery item from the list
document.getElementById("grocery-list").addEventListener("click", function (e) {
  // Instantiate the UI object
  const ui = new UI();

  ui.deleteGroceryFromList(e.target);

  ui.showAlert(
    "Grocery item successfully removed from the list!",
    "text-success"
  );

  e.preventDefault();
});
