async function applyNegotiation(flatId) {
    const res = await apiRequest("/negotiations/create", "POST", { flatId });
    alert(res.message || "Negotiation sent.");
}
