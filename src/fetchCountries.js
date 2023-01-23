export {fetchCountries};
import Notiflix from 'notiflix';

function fetchCountries(name) {
    return fetch(name)
    .then(Response => Response.json())
    .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"))
}
