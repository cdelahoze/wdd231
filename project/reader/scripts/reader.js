// Referencias al DOM para la gestión de textos
const savedTextsSelect = document.getElementById('savedTextsSelect');
const textContentDisplay = document.getElementById('textContentDisplay');

// 1. Cargar la lista JSON almacenada desde LocalStorage (o array por defecto)
function loadTextsFromStorage() {
  const storedJson = localStorage.getItem('taktaim_texts_json');
  
  let textsCatalog = [];

  if (storedJson) {
    try {
      textsCatalog = JSON.parse(storedJson);
    } catch (e) {
      console.error("Error al parsear el JSON de LocalStorage", e);
    }
  } else {
    // Si aún no hay datos guardados desde la página del editor, creamos uno inicial
    textsCatalog = [
      {
        id: 1,
        title: "Sample Reading - Software Engineering",
        content: "Learning software development requires consistent daily practice. When you highlight any word in this text, the dictionary will display its meaning, audio pronunciation, and interactive synonyms."
      }
    ];
    // Guardamos la estructura base inicial
    localStorage.setItem('taktaim_texts_json', JSON.stringify(textsCatalog));
  }

  populateSelectMenu(textsCatalog);
}

// 2. Poblar el menú desplegable <select> con los títulos del JSON
function populateSelectMenu(catalog) {
  if (!savedTextsSelect) return;

  // Limpiar opciones previas manteniendo la primera por defecto
  savedTextsSelect.innerHTML = '<option value="">-- Selecciona un texto del catálogo --</option>';

  catalog.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.title;
    savedTextsSelect.appendChild(option);
  });
}

// 3. Evento al cambiar de opción en el menú desplegable
if (savedTextsSelect) {
  savedTextsSelect.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    const storedJson = localStorage.getItem('taktaim_texts_json');
    
    if (!storedJson || !selectedId) return;

    const catalog = JSON.parse(storedJson);
    const selectedItem = catalog.find(text => text.id == selectedId);

    if (selectedItem) {
      // Inyecta el contenido del texto en el área de lectura
      textContentDisplay.textContent = selectedItem.content;
    }
  });
}

// Inicializar la carga del catálogo al abrir la página
document.addEventListener('DOMContentLoaded', () => {
  loadTextsFromStorage();
});