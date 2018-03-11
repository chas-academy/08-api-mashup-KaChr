import './styles/style.scss';
import {on, sanitizeString, getPromiseData, axelVisar, flatten} from './helpers/';

class Mashed {
  constructor(element) {
    this.root = element;

    this.search = this.search.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    const input = document.querySelector('.form-control');
    const searchBtn = document.querySelector('button');

    searchBtn.addEventListener('click', this.search);
  }
 
  search() {
    let searchQuery = this.input.value;

    let apiCalls = [
      this.fetchPhotos(searchQuery),
      this.fetchWords(searchQuery)
    ];  

    Promise.all(apiCalls)
      .then(result => {
        this.renderPhotos(res[0])
        this.renderWords(res[1])
      })
      .catch(reject);
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

    const wordRes = document.querySelector('.words');
    wordRes.innerHTML = "";

    words.map((word) => {
      const wordList = document.createElement('li');
      const wordAnchor = document.createElement('a');

      wordAnchor.href = '#';
      wordAnchor.textContent = word;

      wordRes.appendChild(wordList);
      wordList.appendChild(wordAnchor);
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

    return fetch(flickrUrl);
      // .then(res => res.json())
      // .then(res => {
      //   this.renderPhotos(res.photos.photo);
      // })
      // .catch(err => console.error(err))
  }

  fetchWords(searchQuery) {
    let wordLabAPIkey = process.env.BHT_API_KEY
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${searchQuery}/json`

    return fetch(wordLabUrl);
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log('Test BigHugeLabs!')
    //     console.log(res)
    // })
    // .catch(err => console.error(err))
  }
} 

(function() {
  new Mashed(document.querySelector('#mashed'))
})();