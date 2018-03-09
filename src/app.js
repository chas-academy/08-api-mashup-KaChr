import './styles/style.scss';
import {on, sanitizeString, getPromiseData, axelVisar, flatten} from './helpers/';

class Mashed {
  constructor(element) {
    this.root = element;

    this.addEventListeners();
  }

  addEventListeners() {
    const input = document.querySelector('.form-control');
    const searchBtn = document.querySelector('button');

    searchBtn.addEventListener('click', () => {
      this.fetchWords(input.value);
      this.fetchPhotos(input.value);
    });
  }

  search() {
    let searchQuery = this.input.value;

    let apiCalls = [
      this.fetchPhotos(searchQuery),
      this.fetchWords(searchQuery)
    ];  

    Promise.all(apiCalls)
      .then((result) => {
        return result.map(type => type.json());
      })
      .catch(reject);
  }

  renderPhotos(photos) {
    const photoRes = document.querySelector('.photo-list');
    photoRes.innerHTML = "";

    photos.forEach((photo) => {
      const photoList = document.createElement('li');

      photoList.style.backgroundImage = `url(${photo.url_o || photo.url_q})`;
      photoList.classList.add('result');

      photoRes.appendChild(photoList);
    });
  }

  fetchPhotos(searchQuery) {
    let resourceUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    let flickrAPIkey = process.env.FLICKR_API_KEY;

    let flickrQueryParams =
      '&text=' + searchQuery + 
      '&extras=original_format,url_q,url_o&format=json&nojsoncallback=1' +
      '&per_page=5'
    let flickrUrl = resourceUrl + flickrAPIkey + flickrQueryParams

    return fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        this.renderPhotos(res.photos.photo);
      })
      .catch(err => console.error(err))
  }

  fetchWords(searchQuery) {
    let wordLabAPIkey = process.env.BHT_API_KEY
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${searchQuery}/json`

    return fetch(wordLabUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Test BigHugeLabs!')
        console.log(res)
    })
    .catch(err => console.error(err))
  }
} 

(function() {
  new Mashed(document.querySelector('#mashed'))
})();