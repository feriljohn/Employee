const apiUrl = "http://localhost:3000/employees";

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
  hideValMsg("sid");
  if (!/^\d{3}$/.test(id)) {
    displayValMsg("sid", "Enter valid id");
    return false;
  }
  return true;
}

function validProject(pro) {
  hideValMsg("project");
  if (!/\D/.test(pro)) {
    displayValMsg("project", "Enter one project");
    return false;
  }
  return true;
}


function searchEmployeid() {
  event.preventDefault();
  const id = document.getElementById("sid").value;
  if(validId(id)){
  console.log(`Searching for employee with ID: ${id}`);
  
  fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Search results:", data);
      displaySearchResults(data, "id");
      clearForm();
    })
    .catch((error) => {
      console.error("Error searching by ID:", error);
    });
}
}

function searchEmployeprojects() {
  event.preventDefault();
  const project = document.getElementById("project").value;
if(validProject(project)){
  console.log(`Searching for employees with projects containing: ${project}`);

  fetch(`${apiUrl}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Search results:", data);
      displaySearchResults(data, "project", project);
      clearForm();
    })
    .catch((error) => {
      console.error("Error searching by project:", error);
    });
  }
}

function displaySearchResults(data, searchType, searchProject) {
  const employeeTable = document.getElementById("employeTable");
  employeeTable.innerHTML = "";

  if (data.length === 0) {
    employeeTable.innerHTML = "<p>No results found.</p>";
    return;
  }

  if (searchType === "id") {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>Emp ID: ${data.id}</td><td>Name: ${data.name}</td><td>Project: ${data.projects}</td>`;
    employeeTable.appendChild(tableRow);
  } else if (searchType === "project") {
    data.forEach((employee) => {
      if (employee.projects && Array.isArray(employee.projects)) {
        for (let i = 0; i < employee.projects.length; i++) {
          if (employee.projects[i].includes(searchProject)) {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `<td>Emp ID: ${employee.id}</td><td>Name: ${employee.name}</td>`;
            employeeTable.appendChild(tableRow);
          }
        }
      }
    });
  }
}


function clearForm() {
  document.getElementById("sid").value = "";
  document.getElementById("project").value = "";
}

