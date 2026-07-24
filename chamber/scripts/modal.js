document.addEventListener("DOMContentLoaded", () => {
  // 1. Manejo del Modal (usando el ID correcto: #newsletter)
  const modal = document.querySelector("#newsletter");
  const openModal = document.querySelector(".open-button");
  const closeModal = document.querySelector(".close-button");

  if (openModal && modal) {
    openModal.addEventListener("click", () => {
      // Si usas <dialog showModal()>, abre en la capa superior
      if (typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.close();
    });
  }

  // 2. Foco y Scroll del Contenedor
  const container = document.getElementById("myFormContainer");
  if (container) {
    const firstInput = container.querySelector("input");
    container.scrollTop = 0;
    if (firstInput) {
      firstInput.focus();
    }
  }

  // 3. Selección de Medallas y Asignación al Input #membership
  const medals = document.querySelectorAll(".medal");
  const membershipInput = document.getElementById("membership");

  if (medals.length > 0 && membershipInput) {
    medals.forEach((medal) => {
      medal.addEventListener("click", () => {
        // Obtiene el valor definido en data-value
        const selectedValue = medal.getAttribute("data-value");

        // Lo escribe en el input de membresía
        membershipInput.value = selectedValue;

        // Efecto visual opcional de medalla activa/seleccionada
        medals.forEach((m) => m.classList.remove("selected"));
        medal.classList.add("selected");
      });
    });
  }
});

// 4. Captura de la Hora Actual al Enviar el Formulario

const joinForm = document.getElementById("joinForm");
if (joinForm) {
  joinForm.addEventListener("submit", () => {
    const now = new Date();
    // Obtiene la hora en formato legible (ej: 18:35:20)
    const timeString = now.toTimeString().split(' ')[0]; 
    document.getElementById("current-time").value = timeString;
  });
}