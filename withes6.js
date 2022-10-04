class Grocery {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
  }
  
  class UI {
    addGroceryToList(Grocery) {
        const groceryList = document.getElementById('grocery-list');
        // Create tr element
        const listRow = document.createElement('tr');
        // Insert cols
        listRow.innerHTML = `
        <td>${grocery.id}</td>
        <td>${grocery.name}</td>
        <td>${grocery.quantity}</td>
        <td>${grocery.price}</td>
        <td><a href=# class="delete-grocery-item text-decoration-none text-danger fw-bold">X</a> </td>
        `;
    groceryList.appendChild(listRow);
    }
  
    showAlert(msg, className) {
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
        }
        
        deleteBook(target) {
            if (target.className === "delete-grocery-item text-decoration-none text-danger fw-bold") {
                target.parentElement.parentElement.remove();
            }
        }
  
    clearFields() {
        document.getElementById("grocery-id").value = "";
        document.getElementById("grocery-name").value = "";
        document.getElementById("grocery-quantity").value = "";
        document.getElementById("grocery-price").value = "";
    }
  }
  
  // Local Storage Class
  class Store {
    static getGroceryItems() {
      let groceries;
      if(localStorage.getItem('groceries') === null) {
        groceries = [];
      } else {
        groceries = JSON.parse(localStorage.getItem('groceries'));
      }
      return groceries;
    }
  
    static displayGroceries() {
      const groceries = Store.getGroceryItems();
  
      groceries.forEach(function(grocery){
        const ui  = new UI;
  
        // Add book to UI
        ui.addGroceryToList(grocery);
      });
    }
  
    static addGrocery(grocery) {
      const groceries = Store.getGroceryItems();
  
      groceries.push(grocery);
  
      localStorage.setItem('groceries', JSON.stringify(groceries));
    }
  
    static removeGrocery(id) {
      const groceries = Store.getGroceryItems();
  
      groceries.forEach(function(grocery, index){
       if(grocery.id === id) {
        groceries.splice(index, 1);
       }
      });
  
      localStorage.setItem('groceries', JSON.stringify(groceries));
    }
  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayGroceries);
  
  // Event Listener for add book
  document.getElementById('grocery-form').addEventListener('submit', function(e){
    // Get form values
    const id = document.getElementById("grocery-id").value;
    const name = document.getElementById("grocery-name").value;
    const quantity = document.getElementById("grocery-quantity").value;
    const price = document.getElementById("grocery-price").value;
  
    // Instantiate a grocery object
    const grocery = new Grocery(id, name, quantity, price);

    // Instantiate UI Object
    const ui = new UI();
  
    if (id === "" || name === "" || quantity === "" || price === "") {
        ui.showAlert("Input fields cannot be empty!", "text-danger");
    } 
    else {
        ui.addGroceryToList(grocery);
        // Add to LS
        Store.addGrocery(grocery);
        // Show success
        ui.showAlert(
            "Grocery item successfully added to the list!",
            "text-success"
        );
        // Clear fields
        ui.clearInputFields();
    }
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('grocery-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteGroceryFromList(e.target);
  
    // Remove from LS
    Store.removeGrocery(e.target.parentElement.previousElementSibling.textContent);
  
    // Show message
    ui.showAlert(
        "Grocery item successfully removed from the list!",
        "text-success"
      );
  
    e.preventDefault();
  });