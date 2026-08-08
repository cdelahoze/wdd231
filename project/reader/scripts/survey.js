const surveyForm = document.getElementById('satisfactionForm');

if (surveyForm) {
  surveyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Redirige al ID del modal para activarlo vía CSS (:target)
    window.location.hash = 'confirmationModal';

    // Reinicia el formulario
    surveyForm.reset();
  });
}