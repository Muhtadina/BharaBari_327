import { apiRequest } from "./api.js";

export async function registerUser(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const accountType = document.getElementById("accountType").value;

  const res = await apiRequest("/routes/users/register", "POST", {
    full_name: fullName,
    email,
    password,
    account_type: accountType
  });

  if (res.username) {
    alert(`Registered successfully! Your username: ${res.username}`);
    // Redirect immediately based on account_type
    if (accountType === "renter") {
        window.location.href = "dashboard.html";
    } else if (accountType === "landlord") {
        window.location.href = "landlord_dashboard.html";
    }
  } else {
    alert("Registration failed: " + (res.error || "Unknown error"));
  }
}

export async function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await apiRequest("/routes/users/login", "POST", { username, password });

  if (res.account_type === "renter") {
    sessionStorage.setItem("token", res.username);
    window.location.href = "dashboard.html";
  } else if (res.account_type === "landlord") {
    sessionStorage.setItem("token", res.username);
    window.location.href = "landlord_dashboard.html";
  } else if (res.role === "admin") {
    sessionStorage.setItem("token", res.username);
    window.location.href = "admin_dashboard.html";
  } else {
    alert("Invalid login");
  }
}
