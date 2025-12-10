async function loadAppointments() {
    const res = await apiRequest("/appointments");
    const list = document.getElementById("appointment-list");
    list.innerHTML = "";

    res.forEach(a => {
        const div = document.createElement("div");
        div.className = "flat-card";
        div.innerHTML = `
            <h3>Flat ID: ${a.flatid}</h3>
            <p>Date: ${a.date}</p>
            <p>Time: ${a.time}</p>
            <p>Renter ID: ${a.renterid}</p>
            <p>Landlord ID: ${a.landlordid}</p>
        `;
        list.appendChild(div);
    });
}


async function createAppointment(event) {
    event.preventDefault();

    const flatId = document.getElementById("flatId").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const res = await apiRequest("/appointments/create", "POST", {
        flatId, date, time
    });

    alert(res.message || "Appointment created.");
}
