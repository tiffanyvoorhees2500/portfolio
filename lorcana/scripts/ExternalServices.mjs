import { getLocalStorage } from '../../scripts/utils.js';
const baseURL = 'https://api.lorcana-api.com/cards';

function convertToJson(res) {
  const jsonResponse = res.json();

  if (!res.ok) {
    throw { name: 'servicesError', message: jsonResponse };
  } else {
    return jsonResponse;
  }
}

export default class ExternalServices {
  constructor() {}
  async getPaginatedCards(pagesize = 30, page = 1, fetchType = 'all', filterParameters = {}) {
    // Build custom URL
    let url = `${baseURL}/${fetchType}?pagesize=${pagesize}&page=${page}`;
    // Check if we have any search parameters
    const stringParams = JSON.stringify(filterParameters);
    if (stringParams !== '{}') {
      url += `&search=`;
      let needSemicolon = false;
      for (const [key, value] of Object.entries(filterParameters)) {
        if (needSemicolon === false) {
          url += `${key}${value}`;
          needSemicolon = true;
        } else {
          url += `;${key}${value}`;
        }
      }
    }
    console.log(url);
    const response = await fetch(`${url}`);
    const data = await convertToJson(response);
    return data;
  }

  async getCardByName(cardName) {
    const response = await fetch(`${baseURL}/fetch?strict=${cardName}`);
    const cardDetails = await convertToJson(response);
    return cardDetails[0]; // We only want to return one object
  }

  async getFavorites(){
    const favorites = getLocalStorage('favorites');
    return favorites;
  }

  async getCollection(){
    const collection = getLocalStorage('collection');
    return collection;
  }
}
