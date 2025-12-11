async function loadFlats() {
    const flats = await apiRequest("/flats");

    const container = document.getElementById("flat-list");
    container.innerHTML = "";

    flats.forEach(f => {
        const div = document.createElement("div");
        div.className = "flat-card";
        div.innerHTML = `
            <h3>${f.location}</h3>
            <p>Rent: ${f.rentpermonth}</p>
            <button onclick="applyNegotiation(${f.flatid})">Negotiate</button>
        `;
        container.appendChild(div);
    });
}
