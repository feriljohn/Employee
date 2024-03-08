const apiUrl = "http://localhost:3000/emp";

document.addEventListener("DOMContentLoaded", displayAll);

function displayAll() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((emp) => {
      const employeeTable = document.getElementById("employeeTable");
      employeeTable.innerHTML = "";
      emp.forEach((ab) => {
        const list = document.createElement("li");
        list.textContent = `${ab.id} - ${ab.name} - ${ab.position} - ${ab.salary}`;
        employeeTable.appendChild(list);
      });
    });
}

function searchEmployee() {
  const search = document.getElementById("search").value;
  fetch(apiUrl).then((response) => response.json())
  .then(emp=>{
    const employee=emp.filter(empl=>empl.id.includes(search) ||
    empl.name.includes(search) || empl.position.includes(search) || empl.salary.includes(search))
    displayAll(employee)
  });
  
}

function addEmployee() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;

  if (id && name && position && salary) {
    const store = { id, name, position, salary };
    console.log(store);
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(store),
    })
      .then((response) => response.json)
      .then((response1) => {
        displayAll();
      });
  }
}

function searchEmployee() {
  const searchInput = document.getElementById("search").value.toLowerCase();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((employees) => {
      const filteredEmployees = employees.filter(
        (employee) =>
          employee.id.includes(searchInput) ||
          employee.name.toLowerCase().includes(searchInput) ||
          employee.email.toLowerCase().includes(searchInput) ||
          employee.position.toLowerCase().includes(searchInput) ||
          employee.salary.includes(searchInput)
      );
      displayEmployees(filteredEmployees);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// const apiUrl = "http://localhost:3000/employees";

// function searchEmployeid() {
//   event.preventDefault();
//   const id = document.getElementById("sid").value;
//   //console.log(id,"hai")

//   fetch(`${apiUrl}/${id}`)
//     .then((response) => response.json())
//     .then((data) => {
//       displaySearchResults(data);
//     })
//     .catch((error) => {
//       console.error("Error searching by ID:", error);
//     });
// }

// function displaySearchResults(data) {
//   const employeeList = document.getElementById("employeTable");
//   employeeList.innerHTML = ""; // Clear previous results

//   if (data.length === 0) {
//     employeeList.innerHTML = "<p>No results found.</p>";
//     return;
//   }

//   const listItem = document.createElement("li");
//   listItem.textContent = `Emp ID: ${data.id}, Name:${data.name} Project: ${data.projects}`;
//   employeeList.appendChild(listItem);
// }

// function searchEmployeprojects() {
//   event.preventDefault();
//   const project = document.getElementById("project").value;
//   console.log(project);

//   fetch(`${apiUrl}`)
//     .then((response) => response.json())
//     .then((data) => {
//       displaySearchResults(data, project);
//     })
//     .catch((error) => {
//       console.error("Error searching by project:", error);
//       console.log(data);
//     });
// }

// function displaySearchResults(data, searchProject) {
//   const employeeList = document.getElementById("employeTable");
//   employeeList.innerHTML = "";

//   if (data.length === 0) {
//     employeeList.innerHTML = "<p>No results found.</p>";
//     return;
//   }

//   data.forEach((employee) => {
//     for (let i = 0; i < employee.projects.length; i++) {
//       if (employee.projects[i].includes(searchProject)) {
//         const listItem = document.createElement("li");
//         listItem.textContent = `Emp ID: ${employee.id}, Name: ${employee.name}`;
//         employeeList.appendChild(listItem);
//       }
//     }
//   });
// }
function searchEmployee() {
  const searchInput = document.getElementById("search").value.toLowerCase();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((employees) => {
      const filteredEmployees = employees.filter(
        (employee) =>
          employee.id.includes(searchInput) ||
          employee.name.toLowerCase().includes(searchInput) ||
          employee.email.toLowerCase().includes(searchInput) ||
          employee.position.toLowerCase().includes(searchInput) ||
          employee.salary.includes(searchInput)
      );
      displayEmployees(filteredEmployees);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//   const users = { id, username, password, role};
//   fetch("http://localhost:3000/users", {
//     method: "POST",
//     body: JSON.stringify(users),
//   });
//   alert("Registration successful! You can now login.");
// }



// function register() {
//   const id = document.getElementById("registerUserId").value;
//   const username = document.getElementById("registerUsername");
//   const password = document.getElementById("registerPassword").value;
//   const role = "user";

//   fetch(`http://localhost:3000/users/${id}`, {
//     method: "GET",
//   })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//     .then((data) => {
//       let isID=false;
//       data.forEach((user) => {
//         if (user.id === id) {
//           isID=true;
//           alert(
//             "User with this ID already exists. Please choose a different ID.");
//         } if(!isID){
//           const users = { id, username, password, role };

//           fetch("http://localhost:3000/users", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(users),
//           });

//           alert("Registration successful! You can now login.");
//         }
//       });
//     }); 
// }