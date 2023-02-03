import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
let name = '';
const countryList = document.querySelector('.country-list');
const input = document.querySelector('input#search-box');

const changeInput = e => {
  name = e.target.value.trim();
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length > 1 && data.length <= 10) {
        renderCountryList(data);
        console.log('2-10', data);
      }
      if ((data.length = 1)) {
        renderCountryList(data);
        console.log('1', data);
      }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
};
input.addEventListener('input', debounce(changeInput, DEBOUNCE_DELAY));

//render
function renderCountryList(name) {
  const markup = name
    .map(name => {
      return `<li>
          <p><b>Name</b>: ${name.name}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
