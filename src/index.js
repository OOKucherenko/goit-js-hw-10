import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
  input: document.querySelector('input#search-box'),
};

const reset = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};
const changeInput = e => {
  let name = '';
  name = e.target.value.trim();
  if (name === '') {
    reset();
    return;
  } else {
    fetchCountries(name)
      .then(data => {
        if (data.length > 10) {
          reset();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length > 1 && data.length <= 10) {
          reset();

          renderCountryList(data);
        }
        if (data.length === 1) {
          reset();
          renderCountryInfo(data);
        }
      })
      .catch(error => {
        reset();
        Notify.failure('Oops, there is no country with that name');
      });
  }
};
refs.input.addEventListener('input', debounce(changeInput, DEBOUNCE_DELAY));

//render
const renderCountryInfo = name => {
  refs.countryList.innerHTML = '';
  const markup = name
    .map(name => {
      const lang = name.languages.map(ln => ln.name).join(', ');
      return `<p><img src="${name.flags.svg}" alt="${name.name}" width="30" height="30"/>${name.name}</p>
        <p>capital: <span class="card">${name.capital}</span></p>
        <p>population: <span class="card">${name.population}</span></p>
        <p>languages: <span class="card">${lang}</span></p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markup;
  refs.countryList.classList.add('js-active');
};

const renderCountryList = name => {
  console.log('1');
  const markup = name
    .map(name => {
      const lang = name.languages.map(ln => ln.name).join(', ');
      return `<p class="field"><img src="${name.flags.svg}" alt="${name.name}" width="30" height="30"/>${name.name}</p>
        <p class="field">capital: <span class="field__text">${name.capital}</span></p>
        <p class="field">population: <span class="field__text">${name.population}</span></p>
        <p class="field">languages: <span class="field__text">${lang}</span></p>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
  refs.countryList.classList.add('js-active');
};
