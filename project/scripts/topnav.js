// Control del botón Hamburguesa
const navButton = document.getElementById('demo');
const topNav = document.getElementById('myTopnav');

if (navButton && topNav) {
  navButton.addEventListener('click', () => {
    topNav.classList.toggle('responsive');
  });
}

// Resaltar automáticamente el enlace activo según la URL actual
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const mainNavLinks = document.querySelectorAll('.topnav a');

  mainNavLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// set current year in footer
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();

const upDate = new Date();
document.querySelector('#update').textContent = upDate.toLocaleString('en-au');