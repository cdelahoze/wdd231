// Default import (no curly braces needed)
import byuiCourse from './course.mjs';

// Named imports (curly braces required)
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// Initialize UI on page load
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

// Event listeners with UI updates
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});