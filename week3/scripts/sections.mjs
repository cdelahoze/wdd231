export function setSectionSelection(sections) {
  const selectElement = document.querySelector("#sectionNumber");
  selectElement.innerHTML = "";
  
  // Scoped directly to the passed array parameter
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = `${section.sectionNum}`;
    selectElement.appendChild(option);
  });
}