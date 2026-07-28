// Controles de Vista Grid/List
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("div.cards");

if (display) {
  display.classList.add("grid");
}

if (gridbutton && listbutton) {
  gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });

  listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
  });
}

// Ruta al archivo JSON en la carpeta local 'data'
const url = 'data/members.json';

// Función asíncrona para obtener los datos usando async/await
async function getMemberData() {
  try {
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      const members = data.members || data.directory;
      
      // Muestra la lista completa de miembros (si existe el contenedor div.cards)
      displayMembers(members);

      // LLAMADA CLAVE: Renderiza los destacados en .spotlights
      displaySpotlights(members);
    } else {
      console.error("Error al cargar el archivo JSON:", response.statusText);
    }
  } catch (error) {
    console.error("Error de conexión o análisis en el fetch:", error);
  }
}

// Función para renderizar las tarjetas en el DOM
function displayMembers(members) {
  const cards = document.querySelector("div.cards");
  if (!cards) return;

  // Limpiar contenedor por seguridad
  cards.innerHTML = "";

  members.forEach((member) => {
    // Crear elementos HTML
    let card = document.createElement("section");
    let name = document.createElement("h3");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let membership = document.createElement("p");
    let website = document.createElement("a");
    let portrait = document.createElement("img");

    // Asignar contenido a los elementos
    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;
    membership.textContent = member.membership || "member";
    website.textContent = member.webname || "Visitar sitio web";
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank"); // Abre en pestaña nueva

    // Atributos de la imagen
    portrait.setAttribute("src", member.imageurl || member.image);
    portrait.setAttribute("alt", `Logo o imagen de ${member.name}`);
    portrait.setAttribute("fetchpriority", "high");
    portrait.setAttribute("width", "216");
    portrait.setAttribute("height", "85");

    // Construir la tarjeta
    card.appendChild(portrait);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(membership);
    card.appendChild(website);

    // Insertar tarjeta en la galería
    cards.appendChild(card);
  });
}

// Función para renderizar las tarjetas en el DOM
function displaySpotlights(members) {
  const spotlightsContainer = document.querySelector("div.spotlights");
  if (!spotlightsContainer) return;

  if (!members || members.length === 0) return;

  // 1. Filtrar solo miembros Gold
  const goldMembers = members.filter(
    (member) =>
      member.membership &&
      member.membership.toString().trim().toLowerCase() === "gold"
  );

  if (goldMembers.length === 0) return;

  // 2. Mezclar el arreglo para obtener 3 al azar
  const shuffledGold = goldMembers.sort(() => 0.5 - Math.random());

  // 3. Tomar un máximo de 3 miembros
  const selectedGold = shuffledGold.slice(0, 3);

  // Clases objetivo
  const targetClasses = [".right2", ".right3", ".right4"];

  // 4. Limpiar los contenedores previos
  targetClasses.forEach((selector) => {
    const container = spotlightsContainer.querySelector(selector);
    if (container) container.innerHTML = "";
  });

  // 5. Inyectar los elementos DIRECTAMENTE en el div azul (.right2, .right3, .right4)
  selectedGold.forEach((member, index) => {
    const targetClass = targetClasses[index];
    const container = spotlightsContainer.querySelector(targetClass);

    if (!container) return;

    // Crear directamente los elementos HTML de información
    let portrait = document.createElement("img");
    let name = document.createElement("h3");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let membership = document.createElement("p");
    let website = document.createElement("a");

    // Asignar datos
    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;
    membership.textContent = member.membership;
    website.textContent = member.webname || "Visitar sitio web";
    website.setAttribute("href", member.website || "#");
    website.setAttribute("target", "_blank");

    // Atributos de la imagen
    portrait.setAttribute("src", member.imageurl || member.image);
    portrait.setAttribute("alt", `Logo o imagen de ${member.name}`);
    portrait.setAttribute("fetchpriority", "high");
    portrait.setAttribute("width", "216");
    portrait.setAttribute("height", "85");

    // Agregar directamente a la división objetivo (.right2, .right3 o .right4)
    container.appendChild(portrait);
    container.appendChild(name);
    container.appendChild(address);
    container.appendChild(membership);

  });
}

// Llamada inicial para ejecutar la función asíncrona
getMemberData();