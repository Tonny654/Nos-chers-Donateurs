let donors = [];

function fetchDonors() {
  // Faire un fetch pour obtenir les 50 utilisateurs de l'API RandomUser
  fetch('https://randomuser.me/api/?results=50')
    .then(response => {
      if (!response.ok) {
        throw new Error('Problème avec la récupération des données');
      }
      return response.json();
    })
    .then(data => {
      // Transformer les données obtenues en un format adapté
      donors = data.results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        city: user.location.city,
        country: user.location.country,
        photo: user.picture.medium, // Utilisation de la photo du profil
      }));
      
      // Afficher les donateurs une fois les données récupérées
      displayDonors(donors);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}

function generateAmount() {
  return Math.floor(Math.random() * 500) + 50;
}

function displayDonors(filteredDonors) {
  const container = document.getElementById("donorCards");
  const totalAmountEl = document.getElementById("totalAmount");
  container.innerHTML = "";
  let total = 0;

  filteredDonors.forEach(donor => {
    const amount = generateAmount();
    donor._amount = amount; // garder pour le tri plus tard
    total += amount;

    const imagePath = `assets/image/${donor.gender === "male" ? "hommes" : "femmes"}/${donor.photo}`;
    
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${donor.photo}" alt="${donor.name}" />
          <h3>${donor.name}</h3>
          <p>${donor.city}, ${donor.country}</p>
          <p><strong>${amount} €</strong></p>
        </div>
        <div class="card-back">
          <h3>Merci ${donor.name}</h3>
          <p>Genre : ${donor.gender}</p>
          <p>Don : ${amount} €</p>
        </div>
      </div>
    `;
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    container.appendChild(card);
  });

  totalAmountEl.textContent = total + " €";
}

function filterDonors(gender) {
  if (gender === "all") {
    displayDonors(donors);
  } else {
    displayDonors(donors.filter(d => d.gender === gender));
  }
}

function sortByAmount(order) {
  const sorted = [...donors].sort((a, b) => {
    return order === 'asc' ? a._amount - b._amount : b._amount - a._amount;
  });
  displayDonors(sorted);
}

function sortByName() {
  const sorted = [...donors].sort((a, b) => a.name.localeCompare(b.name));
  displayDonors(sorted);
}

function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

window.onload = () => fetchDonors(); // Utilisation de fetchDonors pour charger les données au chargement

