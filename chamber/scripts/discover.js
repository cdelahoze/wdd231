// scripts/discover.js
import { discoverItems } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderDiscoverCards();
  handleVisitMessage();
});

// Function 1: Dynamically generate cards from JSON module
function renderDiscoverCards() {
  const container = document.getElementById("discover-cards");
  if (!container) return;

  container.innerHTML = "";

  discoverItems.forEach((item, index) => {
    const card = document.createElement("section");
    card.classList.add("card", `card-${index + 1}`);

    // Si es la primera imagen (LCP), se carga prioritariamente sin lazy loading.
    const isLCP = index === 0;
    const loadingAttr = isLCP ? 'fetchpriority="high"' : 'loading="lazy"';

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.alt}" width="300" height="200" ${loadingAttr}>
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}

// Function 2: Track visits using localStorage
function handleVisitMessage() {
  const visitContainer = document.getElementById("visit-message");
  if (!visitContainer) return;

  const msInDay = 84600000; // 24 * 60 * 60 * 1000
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisitDate");

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = now - Number(lastVisit);

    if (timeDifference < msInDay) {
      message = "Back so soon! Awesome!";
    } else {
      const daysBetween = Math.floor(timeDifference / msInDay);
      message = `You last visited ${daysBetween} ${daysBetween === 1 ? "day" : "days"} ago.`;
    }
  }

  visitContainer.textContent = message;
  localStorage.setItem("lastVisitDate", now.toString());
}