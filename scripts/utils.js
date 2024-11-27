export const renderWithTemplate = function (templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', templateFn);
  if (callback) {
    callback(data);
  }
};

export const loadHeaderFooter = async function () {
  const headerElem = document.getElementById('site-header');
  const footerElem = document.getElementById('site-footer');

  const headerHtml = await loadTemplate('../partials/header.html');
  const footerHtml = await loadTemplate('../partials/footer.html');

  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerElem);
};

async function loadTemplate(path) {
    const html = await fetch(path);
    const htmlString = await html.text();

    return htmlString;
}
