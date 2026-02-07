const API_URL = "http://localhost:5000/api/leads";

// Submit Lead
document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const lead = { name, email, phone };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lead)
  });

  alert("Lead Added Successfully!");

  document.getElementById("leadForm").reset();
  loadLeads();
});

// Load Leads from MongoDB
async function loadLeads() {
  const res = await fetch(API_URL);
  const leads = await res.json();

  const table = document.getElementById("leadTable");
  table.innerHTML = "";

  leads.forEach((lead) => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.status || "New"}</td>
        <td>
          <button onclick="deleteLead('${lead._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Delete Lead
async function deleteLead(id) {
  await fetch(API_URL + "/" + id, {
    method: "DELETE"
  });
  loadLeads();
}

// Auto Load
loadLeads();
