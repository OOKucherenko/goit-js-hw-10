// https://restcountries.com/v2/all?fields=name,capital,currencies
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export default fetchCountries;
