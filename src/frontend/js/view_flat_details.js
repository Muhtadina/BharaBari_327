// frontend/js/view_flat_details.js
export async function loadFlatDetails() {
    const params = new URLSearchParams(window.location.search);
    const flatId = params.get("flatId");

    if (!flatId) return;

    try {
        const res = await fetch(`http://localhost:5000/routes/flats/${flatId}`);
        const flat = await res.json();

        document.querySelector(".flat-details-title").textContent = flat.building;
        document.querySelector(".flat-details-location").textContent = `${flat.location_}, ${flat.division}`;
        document.querySelector(".flat-details-room").textContent = `${flat.room_count} Rooms`;
        document.querySelector(".flat-details-floor").textContent = `Floor: ${flat.floor_level}`;
        document.querySelector(".flat-details-category").textContent = flat.catagory;
        document.querySelector(".flat-details-rent").textContent = `${flat.rentpermonth} BDT`;
        document.querySelector(".flat-details-gas").textContent = `Gas: ${flat.gas_bill}`;
        document.querySelector(".flat-details-water").textContent = `Water: ${flat.water_bill}`;
        document.querySelector(".flat-details-image").src = flat.image_url || 'img/bg.jpg';
    } catch (err) {
        console.error("Failed to load flat details:", err);
    }
}
