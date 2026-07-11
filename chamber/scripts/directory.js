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
const url = 'https://cdelahoze.github.io/wdd231/chamber/data/members.json';

// Función asíncrona para obtener los datos usando async/await
async function getMemberData() {
  try {
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      // Supongamos que tu JSON tiene la clave "members" o "directory"
      const members = data.members || data.directory;
      displayMembers(members);
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
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("fetchpriority", "high");
    portrait.setAttribute("width", "200");
    portrait.setAttribute("height", "100");

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

// Llamada inicial para ejecutar la función asíncrona
getMemberData();