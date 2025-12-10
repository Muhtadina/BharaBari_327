async function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await apiRequest("/users/register", "POST", {
        username, fullName, email, password
    });

    alert(res.message || "Registered.");
}

async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await apiRequest("/users/login", "POST", { username, password });

    if (res.token) {
        sessionStorage.setItem("token", res.token);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login.");
    }
}
