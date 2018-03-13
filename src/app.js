import './styles/style.scss';
import {on, getPromiseData, uriEncodeParams, flattenArray} from './helpers/';

class Mashed {
  constructor(element) {
    this.root = element;

    this.search = this.search.bind(this);
    this.updateSubmitButtonStatus = this.updateSubmitButtonStatus.bind(this);

    this.addEventListeners();
    this.updateSubmitButtonStatus();
  }

  updateSubmitButtonStatus() {
    if(this.input.value.length < 2) {
      this.searchBtn.disabled = true;
    } else {
      this.searchBtn.disabled = false;
    }
  }

  addEventListeners() {
    this.input = document.querySelector('input.form-control');
    this.sidebarWords = document.querySelectorAll('.words');
    this.searchBtn = document.querySelector('button');

    this.searchBtn.addEventListener('click', this.search);
    this.sidebarWords.addEventListener('click', (event) => this.search(event));
    this.input.addEventListener('keyup', this.updateSubmitButtonStatus);
  }
 
  search(event, searchString = null) {
    event.preventDefault();

    let searchQuery = this.input.value;

    this.input.value = searchString ? searchString : searchQuery;
    searchQuery = searchQuery.length ? searchQuery : searchString;
  
    let apiCalls = [
      this.fetchPhotos(searchQuery),
      this.fetchWords(searchQuery)
    ];  

    getPromiseData(apiCalls)
      .then(res => {
        this.renderPhotos(res[0]),
        this.renderWords(res[1])
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderPhotos(data) {
    const photos = data.photos.photo;

    const photoRes = document.querySelector('.photo-list');
    photoRes.innerHTML = "";

    photos.map((photo) => {
      const photoList = document.createElement('li');

      photoList.style.backgroundImage = `url(${photo.url_o || photo.url_q})`;
      photoList.classList.add('result');

      photoRes.appendChild(photoList);
    });
  }

  renderWords(data) {
    let words = Object.keys(data).map(key => {
      return Object.values(data[key]).map(word => {
        return word;
      });
    });

    words = flattenArray(words);

    const wordRes = document.querySelector('.words');
    wordRes.innerHTML = "";

    words.map((word) => {
      const wordList = document.createElement('li');
      const wordAnchor = document.createElement('a');

      wordAnchor.textContent = word;

      wordRes.appendChild(wordList);
      wordList.appendChild(wordAnchor);

      wordList.addEventListener('click', (event) => this.search(event, word))
    });
  }

  fetchPhotos(searchQuery) {
    let resourceUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    let flickrAPIkey = process.env.FLICKR_API_KEY;

    let flickrQueryParams =
      '&text=' + searchQuery + 
      '&extras=original_format,url_q,url_o&format=json&nojsoncallback=1' +
      '&per_page=10' +
      '&safe_search=1'
    let flickrUrl = resourceUrl + flickrAPIkey + flickrQueryParams

    return fetch(flickrUrl);
  }

  fetchWords(searchQuery) {
    let wordLabAPIkey = process.env.BHT_API_KEY
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${searchQuery}/json`

    return fetch(wordLabUrl);
  }
} 

(function() {
  new Mashed(document.querySelector('#mashed'))
})();