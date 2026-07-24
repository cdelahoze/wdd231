document.addEventListener("DOMContentLoaded", () => {
  // 1. Manejo del Modal (<dialog>)
  const modal = document.querySelector("#newsletter");
  const openModal = document.querySelector(".open-button");
  const closeModal = document.querySelector(".close-button");
  const container = document.getElementById("myFormContainer");

  if (openModal && modal) {
    openModal.addEventListener("click", () => {
      if (typeof modal.showModal === "function") {
        modal.showModal();

        // Mover el foco y scroll AL ABRIR el modal (no al cargar la página)
        if (container) {
          container.scrollTop = 0;
          const firstInput = container.querySelector("input");
          if (firstInput) firstInput.focus();
        }
      }
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      if (typeof modal.close === "function") {
        modal.close();
      }
    });
  }

  // 2. Selección de Medallas y Asignación al Input #membership
  const medals = document.querySelectorAll(".medal");
  const membershipInput = document.getElementById("membership");

  if (medals.length > 0 && membershipInput) {
    medals.forEach((medal) => {
      medal.addEventListener("click", () => {
        // 1. Obtiene el valor de data-value (con fallback si viene vacío)
        const selectedValue = medal.dataset.value || "";
        // 2. Asignar el valor al input
        membershipInput.value = selectedValue;

        // 3. Modificar el style directamente desde JavaScript
        if (membershipInput.value === "") {
          membershipInput.style.setProperty(
            "border-left",
            "6px solid red",
            "important",
          );
        } else {
          membershipInput.style.setProperty(
            "border-left",
            "6px solid green",
            "important",
          );
        }
        // Cambia la clase visual
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
    const timeString = now.toTimeString().split(" ")[0];
    document.getElementById("current-time").value = timeString;
  });
}

// Cierre al hacer clic en el backdrop (fuera del modal)
const modal = document.querySelector("#newsletter");

if (modal) {
  modal.addEventListener("click", (e) => {
    // Calculamos el área delimitada por el propio dialog
    const dialogDimensions = modal.getBoundingClientRect();

    // Si el clic ocurrió fuera de sus bordes, significa que tocó el backdrop
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
}
