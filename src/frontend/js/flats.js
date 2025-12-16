// frontend/js/flats.js
import FlatFilter from "../strategies/FlatFilter.js";

const flatFilter = new FlatFilter();
const flatListContainer = document.querySelector(".flat-list");

export async function loadFlats() {
    try {
        const res = await fetch("http://localhost:5000/routes/flats");
        const flats = await res.json();

        renderFlats(flats);

        // Add filter event listeners
        document.getElementById("location").addEventListener("change", () => applyFilters(flats));
        document.getElementById("room_count").addEventListener("change", () => applyFilters(flats));
        document.getElementById("rent").addEventListener("change", () => applyFilters(flats));
        document.getElementById("catagory").addEventListener("change", () => applyFilters(flats));
    } catch (err) {
        console.error("Failed to load flats:", err);
    }
}

function applyFilters(flats) {
    const filters = {
        location: document.getElementById("location").value,
        room_count: document.getElementById("room_count").value,
        rent: document.getElementById("rent").value,
        catagory: document.getElementById("catagory").value
    };
    const filteredFlats = flatFilter.filter(flats, filters);
    renderFlats(filteredFlats);
}

function renderFlats(flats) {
    flatListContainer.innerHTML = "";
    flats.forEach(flat => {
        const div = document.createElement("div");
        div.classList.add("flat-card");
        div.innerHTML = `
            <img src="${flat.image_url || 'img/bg.jpg'}" alt="flat_img" width="230px" height="120px" style="border-radius: 7px; border: solid 1px #060606;">
            <h3><i class="fa-solid fa-circle-check" style="color: green;"></i> ${flat.building}</h3>
            <hr class="my-line">
            <p> ${flat.location_}, ${flat.division} </br>
                ${flat.room_count} Rooms • Bath Count • Balcony Include </br>
                Floor: ${flat.floor_level} • ${flat.catagory} </br>
                Gas: ${flat.gas_bill} • Water: ${flat.water_bill} </br>
                Rent: ${flat.rentpermonth} BDT </br>
                Likes: ${flat.like_count || 0} </p>
            <button class="card_btn" onclick="location.href='view_flat_details.html?flatId=${flat.flat_id}'">View Appartment</button>
        `;
        flatListContainer.appendChild(div);
    });
}
