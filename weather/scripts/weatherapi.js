// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const cityName = document.querySelector('#city-name');

const city = "Trier";
const countryCode = "DE";
const apiKey = '35ddb02ed5c408d116ca4b5d96125809';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=Imperial&appid=${apiKey}`;

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
  
  apiFetch(url);


  function  displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    const iconCode = weatherData.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    const ciudad = weatherData.name;
    const paiscode = weatherData.sys.country;
    const pais = new Intl.DisplayNames(['en'], { type: 'region' }).of(paiscode);
    cityName.textContent = `${ciudad}, ${pais}`;

  }
