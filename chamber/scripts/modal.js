document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MANEJO DEL MODAL DEL FORMULARIO (<dialog>) ---
  const formModal = document.querySelector("#newsletter");
  const openFormBtn = document.querySelector(".open-button");
  const closeFormBtn = document.querySelector(".close-button");
  const container = document.getElementById("myFormContainer");

  if (openFormBtn && formModal) {
    openFormBtn.addEventListener("click", () => {
      if (typeof formModal.showModal === "function") {
        formModal.showModal();
        if (container) {
          container.scrollTop = 0;
          const firstInput = container.querySelector("input");
          if (firstInput) firstInput.focus();
        }
      }
    });
  }

  if (closeFormBtn && formModal) {
    closeFormBtn.addEventListener("click", () => {
      formModal.close();
    });
  }

  // Cierre al hacer clic en el backdrop del <dialog>
  if (formModal) {
    formModal.addEventListener("click", (e) => {
      const dialogDimensions = formModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        formModal.close();
      }
    });
  }

  // --- 2. SELECCIÓN DE MEDALLAS EN EL FORMULARIO ---
  const medals = document.querySelectorAll(".medal");
  const membershipInput = document.getElementById("membership");

  if (medals.length > 0 && membershipInput) {
    medals.forEach((medal) => {
      medal.addEventListener("click", () => {
        const selectedValue = medal.dataset.value || "";
        membershipInput.value = selectedValue.toUpperCase();

        if (membershipInput.value === "") {
          membershipInput.style.setProperty("border-left", "6px solid red", "important");
        } else {
          membershipInput.style.setProperty("border-left", "6px solid green", "important");
        }
        
        medals.forEach((m) => m.classList.remove("selected"));
        medal.classList.add("selected");
      });
    });
  }

  // Captura de hora al enviar
  const joinForm = document.getElementById("joinForm");
  if (joinForm) {
    joinForm.addEventListener("submit", () => {
      const now = new Date();
      const timeString = now.toTimeString().split(" ")[0];
      const timeInput = document.getElementById("current-time");
      if (timeInput) timeInput.value = timeString;
    });
  }

  // --- 3. MANEJO DE MODALES DE BENEFICIOS (.info-modal) ---
  const openInfoButtons = document.querySelectorAll(".btn-more-info");
  const closeInfoButtons = document.querySelectorAll(".close-info-modal");
  const infoModals = document.querySelectorAll(".info-modal");

  openInfoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const targetModal = document.getElementById(modalId);

      if (targetModal) {
        targetModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeInfoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".info-modal");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  window.addEventListener("click", function (e) {
    infoModals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });
});
