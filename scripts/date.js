
document.addEventListener('DOMContentLoaded', () => {
	// Set current year in footer.
	const yearElement = document.querySelector('#year');
	if (yearElement) {
		yearElement.textContent = new Date().getFullYear();
	}

	// Set last update date from the document metadata.
	const updateElement = document.querySelector('#lastModified');
	if (updateElement) {
		updateElement.textContent = `Last Updated: ${document.lastModified}`;
	}
});