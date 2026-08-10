const textForm = document.getElementById('textForm');
const textTitle = document.getElementById('textTitle');
const editorContent = document.getElementById('editorContent');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const statusMessage = document.getElementById('statusMessage');
const jsonPreview = document.getElementById('jsonPreview');
const downloadJsonBtn = document.getElementById('downloadJsonBtn');

// Cargar catálogo inicial desde LocalStorage
let textsCatalog = JSON.parse(localStorage.getItem('taktaim_texts_json')) || [
  {
    id: 1,
    title: "Sample Reading - Software Engineering",
    content: "Learning <b>software development</b> requires consistent daily practice. Highlights include: <ul><li>Vocabulary acquisition</li><li>Pronunciation practice</li></ul>",
    createdAt: "2026-08-05"
  }
];

updateJsonPreview();

// 1. EVENTOS PARA BOTONES DE FORMATO (execCommand)
document.querySelectorAll('.tool-btn').forEach(button => {
  button.addEventListener('click', () => {
    const command = button.getAttribute('data-cmd');
    document.execCommand(command, false, null);
    editorContent.focus(); // Mantener el foco dentro del editor
  });
});

// 2. EVENTO PARA TAMAÑO DE LETRA
fontSizeSelect.addEventListener('change', (e) => {
  const sizeValue = e.target.value;
  document.execCommand('fontSize', false, sizeValue);
  editorContent.focus();
});

// 3. GUARDAR EL TEXTO EN LOCALSTORAGE CON SUBMIT
textForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const rawHtmlContent = editorContent.innerHTML.trim();

  if (!rawHtmlContent || rawHtmlContent === '<br>') {
    showStatus("⚠️ El contenido del texto no puede estar vacío.", "error");
    return;
  }

  const newEntry = {
    id: Date.now(),
    title: textTitle.value.trim(),
    content: rawHtmlContent, // Se guarda el contenido con formato HTML
    createdAt: new Date().toISOString().split('T')[0]
  };

  // Guardar en el arreglo y sobreescribir LocalStorage
  textsCatalog.push(newEntry);
  localStorage.setItem('taktaim_texts_json', JSON.stringify(textsCatalog, null, 2));

  showStatus("✅ Texto con formato enriquecido guardado con éxito.", "success");
  updateJsonPreview();

  // Limpiar campos
  textTitle.value = '';
  editorContent.innerHTML = '';
});

function showStatus(msg, type) {
  statusMessage.textContent = msg;
  statusMessage.className = `status-message ${type}`;
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 4000);
}

function updateJsonPreview() {
  jsonPreview.textContent = JSON.stringify(textsCatalog, null, 2);
}

// Descargar texts.json físicamente
downloadJsonBtn.addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(textsCatalog, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "texts.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});