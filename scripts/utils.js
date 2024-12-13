export const renderWithTemplate = function (templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', templateFn);
  if (callback) {
    callback(data);
  }
};

export const loadHeaderFooter = async function () {
  const headerElem = document.getElementById('site-header');
  const footerElem = document.getElementById('site-footer');

  const headerHtml = await loadTemplate('/partials/header.html');
  const footerHtml = await loadTemplate('/partials/footer.html');

  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerElem);
};

async function loadTemplate(path) {
  const html = await fetch(path);
  const htmlString = await html.text();

  return htmlString;
}

export const renderListWithTemplate = function (templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  const HTMLProdDisplay = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, HTMLProdDisplay.join(''));
  if (clear) {
    parentElement.innerHTML = '';
  }
};

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function toggleObjectInArray(array, obj, key) {
  let index = -1;
  if (array !== null) {
    // Find the index of the object in the array based on the key
    index = array.findIndex((item) => item[key] === obj[key]);
  }

  if (index !== -1) {
    // Object exists, remove it
    array.splice(index, 1);
  } else {
    // Object doesn't exist, add it
    array.push(obj);
  }

  // Return the updated array
  return array;
}

export function objExistsInArray(array, obj, key) {
  let index = -1;
  if (array !== null) {
    // Find the index of the object in the array based on the key
    index = array.findIndex((item) => item[key] === obj[key]);
  }
  let objExists = false;

  if (index !== -1) {
    // Object exists
    objExists = true;
  }

  return objExists;
}
