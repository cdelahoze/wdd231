const dataSources = ['scripts/data.json', './scripts/data.json', 'data.json'];
const filterButtons = document.querySelectorAll('.course-tags button[data-filter]');
const courseList = document.querySelector('.course-list');
const creditsNote = document.querySelector('.credits-note');

let allCourses = [];

function getPrefix(code) {
	const match = String(code).trim().toUpperCase().match(/^[A-Z]+/);
	return match ? match[0] : '';
}

function updateCreditsText(courses) {
	if (!creditsNote) {
		return;
	}

	const plannedCredits = courses.reduce((total, course) => total + Number(course.credits_planned || 0), 0);
	const earnedCredits = courses.reduce((total, course) => total + Number(course.credits_earned || 0), 0);

	creditsNote.textContent = `Credits planned: ${plannedCredits} | Credits earned: ${earnedCredits}`;
}

function createCourseCard(course) {
	const card = document.createElement('article');
	card.className = 'course-card';
	const isCompleted = Boolean(course.completed ?? Number(course.credits_earned || 0) > 0);
	if (isCompleted) {
		card.classList.add('is-completed');
	}

	const title = document.createElement('h3');
	title.className = 'course-card__title';
	title.textContent = course.course_code;

	const status = document.createElement('p');
	status.className = 'course-card__detail';
	status.textContent = `Status: ${course.status}`;

	const code = document.createElement('p');
	code.className = 'course-card__detail';
	code.textContent = `Course code: ${course.course_code}`;

	const name = document.createElement('p');
	name.className = 'course-card__detail';
	name.textContent = `Course name: ${course.course_name}`;

	const planned = document.createElement('p');
	planned.className = 'course-card__detail';
	planned.textContent = `Credits planned: ${course.credits_planned}`;

	const earned = document.createElement('p');
	earned.className = 'course-card__detail';
	earned.textContent = `Credits earned: ${course.credits_earned}`;

	card.append(title, status, code, name, planned, earned);
	return card;
}

function renderCourses(filter) {
	if (!courseList) {
		return;
	}

	const filteredCourses =
		filter === 'ALL'
			? allCourses
			: allCourses.filter((course) => getPrefix(course.course_code) === filter);

	courseList.innerHTML = '';

	if (!filteredCourses.length) {
		const emptyState = document.createElement('p');
		emptyState.textContent = 'No courses found for this filter.';
		courseList.append(emptyState);
		updateCreditsText([]);
		return;
	}

	const cards = filteredCourses.map(createCourseCard);
	courseList.append(...cards);
	updateCreditsText(filteredCourses);
}

function setActiveFilter(button) {
	filterButtons.forEach((item) => item.classList.remove('is-active'));
	button.classList.add('is-active');
}

async function loadCourses() {
	if (!courseList) {
		return;
	}

	try {
		let data = null;

		for (const source of dataSources) {
			try {
				const response = await fetch(source);
				if (!response.ok) {
					continue;
				}

				const parsed = await response.json();
				if (Array.isArray(parsed) && parsed.length > 0) {
					data = parsed;
					break;
				}
			} catch (fetchError) {
				// Ignore fetch errors here and continue with other sources or fallback data.
			}
		}

		if (!data && Array.isArray(window.COURSE_DATA)) {
			data = window.COURSE_DATA;
		}

		if (!data) {
			throw new Error('No course data source is available.');
		}

		allCourses = Array.isArray(data) ? data : [];
		renderCourses('ALL');
	} catch (error) {
		courseList.innerHTML = '<p>Could not load course data from data.json.</p>';
		if (creditsNote) {
			creditsNote.textContent = 'Credits unavailable.';
		}
		console.error('Error loading courses:', error);
	}
}

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const filter = button.dataset.filter || 'ALL';
		setActiveFilter(button);
		renderCourses(filter);
	});
});

loadCourses();
