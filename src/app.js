// import './styles/app.scss';
import './styles/style.scss';
import {on, sanitizeString, getPromiseData, axelVisar, flatten} from './helpers/';

class Mashed {
  constructor(element) {
    this.root = element;

    this.fetchPhotos();
    this.fetchWords('hippopotamus');
  }

  fetchPhotos() {
    let resourceUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    let flickrAPIkey = process.env.FLICKR_API_KEY;

    let flickrQueryParams =
      '&text=space' +
      '&extras=url_q&format=json&nojsoncallback=1' +
      '&per_page=5'
    let flickrUrl = resourceUrl + flickrAPIkey + flickrQueryParams

    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Test FlickR!')
        console.log(res)
      })
      .catch(err => console.error(err))
  }

  fetchWords(query) {
    let wordLabAPIkey = process.env.BHT_API_KEY;
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${query}/json`

    fetch(wordLabUrl)
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