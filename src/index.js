import './css/styles.css';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
let name = '';
const input = document.querySelector('input#search-box');
input.addEventListener('input', e => {
  name = e.currentTarget.value;
  fetchCountries(name);
});
