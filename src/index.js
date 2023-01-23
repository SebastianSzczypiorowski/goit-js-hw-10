import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce, result } from 'lodash'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const Input = document.getElementById('search-box')
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list')
countryInfo.classList.add('hidden')




Input.addEventListener('input', debounce((e) => {
e.preventDefault()
let countryName = Input.value.trim();
let FINAL_URL = `https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`;

  fetchCountries(FINAL_URL)
  .then((data) => { 
    const newArray = data.map(name => name.name)
    console.log(data)
    if(newArray.length > 10) { 
      clearCountries();
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if(newArray.length === 1) {
      clearCountries();
      displayCountries(data);
      countryInfo.classList.remove('hidden')
    } else {
      clearCountries();
      displayCountries(data);
      countryInfo.classList.add('hidden')
    }
  })
  .catch(error => {
    Notiflix.Notify.failure("Oops, there is no country with that name")
  });
  const displayCountries = (data) => {
    data.forEach((country) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="country__header">
      <img src= "${country.flags.svg}" alt="${country.name} flag" class="country__header-svg"><h2 class="country__header-name">${country.name}</h2>`;
       countryList.prepend(li);
      
       countryInfo.innerHTML = `
       <p><span>Capital:</span> ${country.capital}</p>
       <p><span>Population:</span> ${country.population}</p>
       <p><span>Languages:</span>${country.languages[0].name}</p>
        `;
        
      
    })
  }

}, DEBOUNCE_DELAY))



function clearCountries() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}