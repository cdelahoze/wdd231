// set current year in footer
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();



const upDate = new Date();
document.querySelector('#update').textContent = upDate.toLocaleString('en-au');

const options= { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
document.querySelector('#updateFormatted').textContent = upDate.toLocaleString('en-au', options);



// make onclick of the top nav

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

document.getElementById('demo').addEventListener('click', myFunction);

// banner 

const dia = new Date(); {
if (dia.getDay() == 1) {
    document.querySelector('#banner').style.display="block";
}

if (dia.getDay() == 4) {
    document.querySelector('#banner').style.display="block";
}
}

// lazy load efect

const imagesToLoad = document.querySelectorAll('img[data-src]');

const imgOptions = { threshold: 1, rootMargin: "0px 0px 50px 0px"};

const loadImages = (img) => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = () => {
    img.removeAttribute('data-src');
  };
};


if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    }, imgOptions) ;
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  } 

  // Resaltar el enlace activo en la navegación
const mainNav = document.querySelectorAll('.topnav a');
const currentPath = window.location.pathname;

mainNav.forEach((link) => {
  // Compara la ruta de la página actual con el atributo href del enlace
  if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});