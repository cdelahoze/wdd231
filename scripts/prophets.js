// 1. Declaración de variables principales
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('.cards');

// 2. Función asíncrona para obtener los datos JSON
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  
  // console.table(data.prophets); // Descomentar para pruebas temporales
  displayProphets(data.prophets);
}

// 3. Expresión de función de flecha para construir las tarjetas HTML
const displayProphets = (prophets) => {
  prophets.forEach((prophet, index) => {
    // Crear elementos HTML
    let card = document.createElement('section');
    card.setAttribute('role', 'listitem');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    // Construir el nombre completo usando template literals
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Construir la información adicional (Fecha y lugar de nacimiento)
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Configurar atributos de la imagen
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    const isFirstCard = index === 0;
    portrait.setAttribute('loading', isFirstCard ? 'eager' : 'lazy');
    portrait.setAttribute('fetchpriority', isFirstCard ? 'high' : 'auto');
    portrait.setAttribute('decoding', 'async');
    portrait.setAttribute('width', '250');
    portrait.setAttribute('height', '324');

    // Agregar los elementos al contenedor 'card'
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Agregar la tarjeta al contenedor principal '#cards'
    cards.appendChild(card);
  }); // Fin del forEach
};

// 4. Llamada a la función principal
getProphetData();