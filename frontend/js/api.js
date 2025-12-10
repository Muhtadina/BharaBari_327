const API_BASE_URL = "http://localhost:5000";

async function apiRequest(endpoint, method = "GET", body = null) {
    const options = { method, headers: { "Content-Type": "application/json" } };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return res.json();
}
