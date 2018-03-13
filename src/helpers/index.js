/** Makes us able to use on without jQuery */
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
};

/**
 * 
 * @param {Array} arr Array of promises to be resolved
 */
export function getPromiseData(promises) {
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(res => {
        return res.map( type => type.json() );
      })
      .then(res => {
        Promise.all(res)
          .then(resolve)
      })
      .catch(reject);
  });
}

/**
 * Helps with URI encoding for URL params
 * 
 * Example:
 * 
 * const params = {
 *  key: value,
 *  other key: otherValue,
 *  arrayKey: [1, 2, 3]
 * }
 * 
 * const encodedParams = uriEncodeParams(params);
 * 
 * encodedParams = "?key=value&other=value&arrayKey=1,2,3"
 * @param {Object} params
 */
export function uriEncodeParams(params) {
  return Object.keys(params).map(function(key) {
      console.log([key, params[key]]);
      return [key, params[key]].map(encodeURIComponent).join("=");
  }).join("&");
}

/**
 * This function recursively flattenedArraytens nested arrays.
 * 
 * Example:
 * 
 * const myNestedArr = [1, [2, 3, [4, 5]]];
 * 
 * const flattenedArray = flattenArray(myNestedArray);
 * 
 * Output: 
 * 
 * flattenedArray = [1, 2, 3, 4, 5];
 *
 * @param {*} nestedArray 
 */
export function flattenArray (nestedArray) {
  const flattenedArray = [].concat(...nestedArray);
  return flattenedArray.some(Array.isArray) ? flattenArray(flattenedArray) : flattenedArray;
}
