const apiUrl = "http://localhost:3000/employees";
flag = true;
flag1 = true;

function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  if (!token) {
    window.location.href = "userlogin.html";
    return
  }
  const decodeToken=JSON.parse(atob(token))
  if(decodeToken.role!=="admin"){
    window.location.href= "userlogin.html"
  }
}
isAuthenticated();

document.addEventListener("DOMContentLoaded", fetchAndDisplayEmployees);

function displayValMsg(fieldId, Msg) {
  const fieldErMsg = document.getElementById(`${fieldId}_error`);
  fieldErMsg.innerHTML = Msg;
  fieldErMsg.style.display = "block";
}

function hideValMsg(fieldId) {
  const fieldErMsg = document.getElementById(`${fieldId}_error`);
  fieldErMsg.style.display = "none";
}

function validId(id) {
  hideValMsg("id");
  if (!/^\d{3}$/.test(id)) {
    displayValMsg("id", "Enter 3 digit id");
    return false;
  }
  return true;
}
function validEmail(email) {
  hideValMsg("email");
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    displayValMsg("email", "Please enter a valid email address.");
    return false;
  }
  return true;
}

function fetchAndDisplayEmployees() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((employees) => {
      displayEmployees(employees);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// async function addEmployee() {
//   try {
//     event.preventDefault();
//     const id = document.getElementById("id").value;
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const position = document.getElementById("position").value;
//     const salary = document.getElementById("salary").value;
//     const projects = getProjectName();

//     if (
//       validId(id) &&
//       validEmail(email) &&
//       name &&
//       position &&
//       salary &&
//       projects
//     ) {
//       const uidResponse = await fetch(`${apiUrl}/${id}`);

//       if (uidResponse.ok) {
//         const existingId = await uidResponse.json();

//         if (existingId.id == id) {
//           alert("Updated");
//           flag1 = false;
//         }
//       }

//       const employee = { id, name, email, position, salary, projects };

//       if (flag && flag1) {
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           body: JSON.stringify(employee),
//         });

//         if (response.ok) {
//           const newEmployee = await response.json();
//           fetchAndDisplayEmployees(); // Refresh the employee list
//           clearForm();
//         } else {
//           throw new Error(`Error: ${response.status}`);
//         }
//       } else {
//         const updateResponse = await fetch(`${apiUrl}/${employee.id}`, {
//           method: "PATCH",
//           body: JSON.stringify(employee),
//         });

//         if (updateResponse.ok) {
//           fetchAndDisplayEmployees();
//         } else {
//           throw new Error(`Error: ${updateResponse.status}`);
//         }
//       }

//       flag = true;
//       flag1 = true;
//     }
//   } catch (error) {
//     console.error("Error adding/updating employee:", error);
//   }
// }

async function updateEmployee() {
  try {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;
    const salary = document.getElementById("salary").value;
    const projects = getProjectName();

    if (
      validId(id) &&
      validEmail(email) &&
      name &&
      position &&
      salary &&
      projects
    ) {
      const existingEmployeeResponse = await fetch(`${apiUrl}/${id}`);

      if (existingEmployeeResponse.ok) {
        const existingEmployee = await existingEmployeeResponse.json();
        const updatedEmployee = {
          id,
          name: name || existingEmployee.name,
          email: email || existingEmployee.email,
          position: position || existingEmployee.position,
          salary: salary || existingEmployee.salary,
          projects: projects || existingEmployee.projects,
        };

        const updateResponse = await fetch(`${apiUrl}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedEmployee),
        });

        if (updateResponse.ok) {
          alert("Employee Updated");
          fetchAndDisplayEmployees(); // Refresh the employee list
          clearForm();
        } else {
          throw new Error(`Error updating employee: ${updateResponse.status}`);
        }
      } else {
        throw new Error(
          `Error fetching existing employee data: ${existingEmployeeResponse.status}`
        );
      }
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
}

function editEmployee(id, name, email, position, salary, projects) {
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("position").value = position;
  document.getElementById("salary").value = salary;

  const projectField = document.getElementById("projectField");
  projectField.innerHTML = "";

  projects.forEach((project, index) => {
    const label = document.createElement("label");
    label.for = "project" + (index + 1);
    label.textContent = "Project " + (index + 1) + ":";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "project" + (index + 1);
    input.name = "project";
    input.required = true;
    input.value = project;

    projectField.appendChild(label);
    projectField.appendChild(input);
  });
}

function eEmployee(id) {
  fetch(apiUrl + "/" + id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      flag = false;

      editEmployee(
        data.id,
        data.name,
        data.email,
        data.position,
        data.salary,
        data.projects
      );
    })
    .catch((error) => console.log(error));
}

function deleteEmployee(id) {
  const confirmDelete = confirm("Do you want to delete this employee?");

  if (confirmDelete) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchAndDisplayEmployees())
      .catch((error) => console.error("Error deleting employee:", error));
  }
}

function displayEmployees(employees) {
  const employeeTable = document.getElementById("employeeTable");
  const userEmployees = employees.filter(
    (employee) => employee.role === "user"
  );
  const tableBody = document.createElement("tbody");

  userEmployees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td>₹${employee.salary}</td>
            <td>${employee.projects}</td>
            <td>
                <button onclick="eEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
                       
            </td>
            <button onclick="addProjectField(${employee.id})">Add Project</button>
        `;
    tableBody.appendChild(row);
  });

  employeeTable.appendChild(tableBody);
}

function clearForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("position").value = "";
  document.getElementById("salary").value = "";
}

function addProjectField() {
  const projectField = document.getElementById("projectField");
  var projectCount =
    projectField.querySelectorAll('input[name="project"]').length + 1;
  var label = document.createElement("label");
  label.for = "project" + projectCount;
  label.textContent = "Project " + projectCount + ":";
  var input = document.createElement("input");
  input.type = "text";
  input.id = "project" + projectCount;
  input.name = "project";
  projectField.appendChild(label);
  projectField.appendChild(input);
}

function getProjectName() {
  const projectInputs = document.querySelectorAll('input[name="project"]');
  const projectNames = [];
  projectInputs.forEach((input) => {
    projectNames.push(input.value);
  });
  return projectNames;
}

function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "userlogin.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logout();
  }
}
