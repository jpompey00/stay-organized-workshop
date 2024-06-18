"use strict"

const prioritySelect = document.getElementById("prioritySelect");
const userSelect = document.getElementById("userSelect");
const todoList = document.getElementById("todoList");


window.onload = function () {
  populateUser();
  prioritySelect.onchange = onPrioritySelectChange;
  userSelect.onchange = onchange;
  

}
function onPrioritySelectChange() {
  console.log("priority select changed");
  const selectedUserId = userSelect.value;
  const selectedPriority = prioritySelect.value;
  fetch("http://localhost:8083/api/todos/")
    .then(response => response.json())
    .then(todos => {
      const todoList = document.getElementById("todoList");
      todoList.innerHTML = "";
      const filteredTodos = todos.filter(
      (todo) => todo.priority === selectedPriority
      );


      filteredTodos.forEach((todo) => {
        fetch(`http://localhost:8083/api/users`)
          .then(response => response.json())
          .then(users => {
            users.forEach(user => {
              if (user.id == userSelect.value) {
                if (todo.userid == user.id) {
                  console.log(todo);

                  const row = document.createElement("tr");
                  row.innerHTML = `
              <td>${todo.category}</td>
              <td>${todo.description}</td>
              <td>${todo.deadline}</td>
              <td>${todo.priority}</td>
            `;
                  todoList.appendChild(row);
                }
              }
            })

          })
      });
    });

}

// populate the user dropdown with name 
function populateUser() {
  fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(users => {
      const userSelect = document.getElementById("userSelect");
      console.log("hello")
      users.forEach(user => {
        let option = document.createElement("option");
        option.text = user.name;
        option.value = user.id;
        userSelect.appendChild(option);
        const userId = user.id;
      })
    });
}
 //function onchange(){}
  // Add "View All" option
let viewAllOption = document.createElement("option");
viewAllOption.text = "View All";
viewAllOption.value = "all";
userSelect.appendChild(viewAllOption);

fetch("http://localhost:8083/api/todos/")
    .then(response => response.json())
    .then(todos => {
      todos.forEach((todo) => {
        fetch(`http://localhost:8083/api/users`)
          .then(response => response.json())
          .then(users => {
           
              if (viewAllOption.value === "all") {
                console.log(todo);
                const row = document.createElement("tr");
                  row.innerHTML = `
              <td>${todo.category}</td>
              <td>${todo.description}</td>
              <td>${todo.deadline}</td>
              <td>${todo.priority}</td>
            `;
                  todoList.appendChild(row);
        }

       })
    }
    )

 
    })
  

  

  
