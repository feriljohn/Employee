const apiUrl = "http://localhost:3000/employees";
function toggleForm(formId) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (formId === "loginForm") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else if (formId === "registerForm") {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}

async function register() {
  try {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;
    const password = document.getElementById("password").value;
    const salary = "";
    const projects = "";
    const role = "user";

    let flag = true;

    // Validate input fields
    if (validId(id) && name && validEmail(email) && position && password) {
      // Check if the user with the given ID already exists
      fetch(`${apiUrl}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((user) => {
            if (user.id === id) {
              alert(
                "User with this ID already exists!! Please choose a different ID."
              );
              flag = false;
            }
          });

          if (flag) {
            const employees = {
              id,
              name,
              email,
              position,
              password,
              salary,
              projects,
              role,
            };

            fetch(`${apiUrl}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employees),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                alert("Registration successful! You can now login.");
              })
              .catch((error) => {
                console.error("Error during registration:", error);
                alert(
                  "An error occurred during registration. Please try again."
                );
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert(
            "An error occurred during the fetch operation. Please try again."
          );
        });
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

function login() {
  const userid = document.getElementById("loginId").value;
  const password1 = document.getElementById("loginPassword").value;

  fetch(`${apiUrl}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const userFound = data.find(
        (user2) => user2.id === userid && user2.password === password1
      );

      if (userFound) {
        alert("Login Successful");
        sessionStorage.setItem("loggedInUser", JSON.stringify(userFound));
        const authToken = generateAuthToken(userFound.email, userFound.role);
        localStorage.setItem("authToken", authToken);
        if (userFound.role === "admin") {
          window.location.href = "index.html";
        } else if (userFound.role === "user") {
          window.location.href = "userpage.html";
        } else {
          alert("Invalid role");
        }
      } else {
        alert("Invalid username or password");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    });
}

function generateAuthToken(email, role) {
  const token = {
    email,
    role,
  };
  const encoded = btoa(JSON.stringify(token));
  return encoded;
}

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
