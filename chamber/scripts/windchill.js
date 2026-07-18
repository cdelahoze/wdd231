
// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const currentSpeed = document.querySelector('#wind');
const currentWind = document.querySelector('#wind-ch');

const city = "Facatativá";
const countryCode = "CO";
const apiKey = '35ddb02ed5c408d116ca4b5d96125809';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

// Cambiamos 'weather' por 'forecast'
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

async function apiFetch(apiURL) {
    try {
      const response = await fetch(apiURL);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        // displayResults(data);
        displayResults(data)
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch(weatherUrl);
  


  function  displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const speed = weatherData.wind.speed;
    const tempC =weatherData.main.temp;
    const temp = (((tempC) * 9/5) + 32)
    let windChill;
    if (temp >= 50) {
        windChill = "NA";
    }
    if(speed < 3) { 
      windChill = "NA";}
   else {
        windChill = (Math.round((35.74 + (0.6215 * temp) - (35.75 * speed**0.16) + (0.4275 * temp * speed**0.16))*10))/10;
    }

    const iconCode = weatherData.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    currentSpeed.innerHTML = ` <strong>${speed}</strong> Km/h `;
    currentWind.innerHTML = ` <strong>${windChill}</strong> `;
  }

// Elemento contenedor en el HTML para meter las tarjetas del pronóstico
const forecastContainer = document.querySelector('#forecast-container'); 

async function apiFetchForecast(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Ver la lista de 40 elementos
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetchForecast(urlForecast);

function displayForecast(forecastData) {
  // Limpiamos el contenedor principal de tu HTML
  forecastContainer.innerHTML = '';

  // 1. Filtramos por hora (12:00 PM) Y limitamos el arreglo a los primeros 3 días (.slice(0, 3))
  const pronosticoTresDias = forecastData.list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 3); 

  let diasHTML = '';

  // 2. Iteramos únicamente sobre los 3 días seleccionados
  pronosticoTresDias.forEach(dia => {
    const temp = dia.main.temp.toFixed(0);
    const iconCode = dia.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = dia.weather[0].description;
    
    const fechaObjeto = new Date(dia.dt_txt);
    const opciones = { weekday: 'short', day: 'numeric' }; 
    const fechaFormateada = fechaObjeto.toLocaleDateString('es-ES', opciones);
    const fechaCapitalizada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    diasHTML += `
      <div class="forecast-day-item">
        <span class="forecast-date">${fechaCapitalizada}</span>
        <img src="${iconsrc}" alt="${desc}" class="forecast-mini-icon">
        <span class="forecast-temp"><strong>${temp}°C</strong></span>
        <span class="forecast-desc">${desc}</span>
      </div>
    `;
  });

  // 3. Creamos la tarjeta única con el título actualizado
  const tarjetaUnica = `

      <h3 class="forecast-title">Forecast</h3>
      <div class="forecast-days-container">
        ${diasHTML} 
      </div>

  `;

  // 4. Pintamos el resultado en el DOM
  forecastContainer.innerHTML = tarjetaUnica;
}