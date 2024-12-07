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
  // async getAllCards() {
  //   const response = await fetch(`${baseURL}/all`);
  //   const data = await convertToJson(response);
  //   return data;
  // }
  async findCardById(id) {
    const response = await fetch(`${baseURL}/all`);
    const product = await convertToJson(response);
    return product.Result;
  }

  async getPaginatedCards(pagesize = 30, page = 1, fetchType = 'all', filterParameters = {}) {
    // Build custom URL
    let url = `${baseURL}/${fetchType}?pagesize=${pagesize}&page=${page}`;
    // Check if we have any search parameters
    const stringParams = JSON.stringify(filterParameters);
    if (stringParams !== '{}') {
      url += `&search=`;
      let needSemicolon = false;
      for (const [key, value] of Object.entries(filterParameters)) {
        if ((needSemicolon === false)) {
          url += `${key}=${value}`;
          needSemicolon = true;
        } else {
          url += `;${key}=${value}`;
        }
      }
    }
    const response = await fetch(`${url}`);
    const data = await convertToJson(response);
    return data;
  }
}
