document.addEventListener("DOMContentLoaded", function () {
  checkAndLoadUser();
});

async function checkAndLoadUser() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    displayWelcomeMessage(loggedInUser);

    try {
      const matchingEmployee = await fetchEmployeeData(loggedInUser.id);

      if (matchingEmployee) {
        displayEmployeeData(matchingEmployee);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("An error occurred while loading user data. Please try again.");
    }
  } else {
    redirectToLoginPage();
  }
}

async function fetchEmployeeData(id) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error("Error fetching employee data");
  }
}

function displayEmployeeData(matchingEmployee) {
  const tableBody = document.getElementById("employeeTableBody");
  const row = tableBody.insertRow();
  row.innerHTML = `
    <td>${matchingEmployee.id}</td>
    <td>${matchingEmployee.name}</td>
    <td>${matchingEmployee.email}</td>
    <td>${matchingEmployee.position}</td>
     <td>${
      //  matchingEmployee.salary === null  ?
         matchingEmployee.salary
        //  : "Salary not available"
     }</td>

    <td>${
      matchingEmployee.projects.length > 0
        ? matchingEmployee.projects.join(", ")
        : "No Projects Assigned"
    }</td>
  `;
}

function redirectToLoginPage() {
  window.location.href = "login.html";
}

function displayWelcomeMessage(loggedInUser) {
  document.getElementById(
    "welcomeMessage"
  ).innerText = `Hello, ${loggedInUser.name}!`;
}

function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  if (!token) {
    window.location.href = "userlogin.html";
    return
  }
  const decodeToken=JSON.parse(atob(token))
  if(decodeToken.role!=="user"){
    window.location.href= "userlogin.html"
  }
}
isAuthenticated()

function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "userlogin.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logout();
  }
}
