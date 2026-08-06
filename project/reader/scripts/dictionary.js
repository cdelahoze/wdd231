// Referencias al DOM
const searchForm = document.getElementById('searchForm');
const wordInput = document.getElementById('wordInput');
const resultContainer = document.getElementById('resultContainer');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('historySection');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Cargar historial inicial desde LocalStorage (o array vacío si no existe)
let searchHistory = JSON.parse(localStorage.getItem('dict_history')) || [];

// Evento al enviar el formulario
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = wordInput.value.trim().toLowerCase();
  if (word) {
    executeSearch(word);
  }
});

// Evento para borrar historial
clearHistoryBtn.addEventListener('click', () => {
  searchHistory = [];
  localStorage.removeItem('dict_history');
  renderHistory();
});

// Función central para coordinar la búsqueda y el historial
function executeSearch(word) {
  wordInput.value = word;
  saveToHistory(word);
  fetchDefinition(word);
}

// 1. Guardar palabra en LocalStorage (sin duplicados y máximo 5 elementos)
function saveToHistory(word) {
  searchHistory = searchHistory.filter(item => item !== word); // Quitar si ya existía
  searchHistory.unshift(word); // Insertar al inicio
  if (searchHistory.length > 5) searchHistory.pop(); // Limitar a las últimas 5

  localStorage.setItem('dict_history', JSON.stringify(searchHistory));
  renderHistory();
}

// 2. Mostrar el historial en pantalla
function renderHistory() {
  if (searchHistory.length === 0) {
    historySection.style.display = 'none';
    return;
  }

  historySection.style.display = 'block';
  historyList.innerHTML = searchHistory.map(word => `
    <button type="button" class="history-chip" onclick="executeSearch('${word}')">
      ${word}
    </button>
  `).join('');
}

// 3. Consultar la API
async function fetchDefinition(word) {
  resultContainer.innerHTML = '<p class="placeholder-text">Buscando definición...</p>';

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) throw new Error('No se encontró la palabra solicitada.');

    const data = await response.json();
    displayResult(data[0]);
  } catch (error) {
    resultContainer.innerHTML = `<p class="error-msg">⚠️ ${error.message}</p>`;
  }
}

// 4. Renderizar el resultado con Sinónimos e Interacción
function displayResult(entry) {
  const phoneticText = entry.phonetic || (entry.phonetics.find(p => p.text)?.text) || '';
  const audioObj = entry.phonetics.find(p => p.audio && p.audio.length > 0);
  const audioUrl = audioObj ? audioObj.audio : null;

  const meaningsHTML = entry.meanings.map(meaning => {
    const definitionsList = meaning.definitions.slice(0, 3).map(def => `
      <li>
        ${def.definition}
        ${def.example ? `<span class="example">"${def.example}"</span>` : ''}
      </li>
    `).join('');

    // Extraer sinónimos
    let synonyms = meaning.synonyms || [];
    meaning.definitions.forEach(def => {
      if (def.synonyms) synonyms = synonyms.concat(def.synonyms);
    });
    synonyms = [...new Set(synonyms)].slice(0, 5); // Sin duplicados, máx 5

    // Plantilla de sinónimos (se busca automáticamente al hacer clic)
    const synonymsHTML = synonyms.length > 0 ? `
      <div class="synonyms-container">
        <span class="synonyms-label">Sinónimos:</span>
        ${synonyms.map(syn => `
          <button type="button" class="synonym-chip" onclick="executeSearch('${syn}')">
            ${syn}
          </button>
        `).join('')}
      </div>
    ` : '';

    return `
      <div class="meaning-block">
        <p class="part-of-speech">${meaning.partOfSpeech}</p>
        <ul class="definitions-list">
          ${definitionsList}
        </ul>
        ${synonymsHTML}
      </div>
    `;
  }).join('');

  resultContainer.innerHTML = `
    <div class="word-header">
      <div class="word-title">
        <h2>${entry.word}</h2>
        ${phoneticText ? `<p class="phonetic">${phoneticText}</p>` : ''}
      </div>
      ${audioUrl ? `
        <button class="btn-audio" onclick="playAudio('${audioUrl}')" title="Escuchar pronunciación">
          🔊
        </button>
      ` : ''}
    </div>
    <div class="word-body">
      ${meaningsHTML}
    </div>
  `;
}

function playAudio(url) {
  new Audio(url).play().catch(e => console.error("Error de audio:", e));
}

// Inicialización
renderHistory();