// Referencias al DOM
const searchForm = document.getElementById('searchForm');
const wordInput = document.getElementById('wordInput');
const resultContainer = document.getElementById('resultContainer');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('historySection');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const readingArea = document.getElementById('readingArea'); // Contenedor del texto a leer

// Historial cargado desde LocalStorage (Browser API)
let searchHistory = JSON.parse(localStorage.getItem('dict_history')) || [];

// 1. EVENTOS DE BÚSQUEDA
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = wordInput.value.trim().toLowerCase();
  if (word) executeSearch(word);
});

clearHistoryBtn.addEventListener('click', () => {
  searchHistory = [];
  localStorage.removeItem('dict_history');
  renderHistory();
});

// 2. DETECCIÓN AUTOMÁTICA DE PALABRA SELECCIONADA (Selection API)
if (readingArea) {
  readingArea.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim().toLowerCase();
    
    // Validar que sea una sola palabra (sin espacios ni caracteres especiales)
    if (selectedText && /^[a-zA-Z]+$/.test(selectedText)) {
      executeSearch(selectedText);
    }
  });
}

// 3. FUNCIÓN CENTRAL DE BÚSQUEDA E HISTORIAL
function executeSearch(word) {
  wordInput.value = word;
  saveToHistory(word);
  fetchWordData(word);
}

function saveToHistory(word) {
  searchHistory = searchHistory.filter(item => item !== word);
  searchHistory.unshift(word);
  if (searchHistory.length > 5) searchHistory.pop();

  localStorage.setItem('dict_history', JSON.stringify(searchHistory));
  renderHistory();
}

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

// 4. CONSULTA A AMBAS APIS EN PARALELO (Dictionary API + Translation API)
async function fetchWordData(word) {
  resultContainer.innerHTML = '<p class="placeholder-text">Cargando definición y traducción...</p>';

  try {
    // Peticiones simultáneas a ambas APIs remotas
    const [dictRes, transRes] = await Promise.all([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`),
      fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|es`)
    ]);

    let dictData = null;
    let spanishTranslation = 'Traducción no disponible';

    if (dictRes.ok) {
      dictData = await dictRes.json();
    }

    if (transRes.ok) {
      const transJson = await transRes.json();
      if (transJson.responseData && transJson.responseData.translatedText) {
        spanishTranslation = transJson.responseData.translatedText.toLowerCase();
      }
    }

    if (!dictData) {
      throw new Error(`No se encontraron detalles en inglés para "${word}".`);
    }

    displayResult(dictData[0], spanishTranslation);

  } catch (error) {
    resultContainer.innerHTML = `<p class="error-msg">⚠️ ${error.message}</p>`;
  }
}

// 5. RENDERIZADO DE RESULTADOS EN EL DOM
function displayResult(entry, translation) {
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

    let synonyms = meaning.synonyms || [];
    meaning.definitions.forEach(def => {
      if (def.synonyms) synonyms = synonyms.concat(def.synonyms);
    });
    synonyms = [...new Set(synonyms)].slice(0, 5);

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
        <p class="translation-tag">Español: <strong>${translation}</strong></p>
        ${phoneticText ? `<p class="phonetic">${phoneticText}</p>` : ''}
      </div>
      ${audioUrl ? `
        <button type="button" class="btn-audio" onclick="playAudio('${audioUrl}')" title="Escuchar pronunciación">
          🔊
        </button>
      ` : ''}
    </div>
    <div class="word-body">
      ${meaningsHTML}
    </div>
  `;
}

// Web Audio API
// 1. Modificación dentro de displayResult()
// RENDERIZADO DE RESULTADOS EN EL DOM
function displayResult(entry, translation) {
  const phoneticText = entry.phonetic || (entry.phonetics.find(p => p.text)?.text) || '';
  const wordToSpeak = entry.word;

  // 1. CONSTRUCCIÓN DE LA VARIABLE meaningsHTML (Aseguramos que esté definida aquí)
  const meaningsHTML = entry.meanings.map(meaning => {
    // Extraer hasta 3 definiciones
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
    synonyms = [...new Set(synonyms)].slice(0, 5); // Sin duplicados, máximo 5

    // Plantilla HTML de sinónimos
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

  // 2. INYECCIÓN EN EL DOM (Aquí se usa meaningsHTML ya definida arriba)
  resultContainer.innerHTML = `
    <div class="word-header">
      <div class="word-title">
        <h2>${entry.word}</h2>
        <p class="translation-tag">Español: <strong>${translation}</strong></p>
        ${phoneticText ? `<p class="phonetic">${phoneticText}</p>` : ''}
      </div>
      <button type="button" class="btn-audio" onclick="speakWord('${wordToSpeak}')" title="Escuchar pronunciación">
        🔊
      </button>
    </div>
    <div class="word-body">
      ${meaningsHTML}
    </div>
  `;
}

// 2. Nueva función de voz usando la Web Speech API (Nativa del Navegador)
function speakWord(text) {
  if (!('speechSynthesis' in window)) {
    alert("Tu navegador no soporta la reproducción de voz.");
    return;
  }

  // Cancelar cualquier audio en curso
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configurar idioma a Inglés (Estados Unidos o Reino Unido)
  utterance.lang = 'en-US';
  utterance.rate = 0.9; // Velocidad ligeramente pausada para mejor claridad de aprendizaje

  // Reproducir voz
  window.speechSynthesis.speak(utterance);
}

// Inicialización
renderHistory();