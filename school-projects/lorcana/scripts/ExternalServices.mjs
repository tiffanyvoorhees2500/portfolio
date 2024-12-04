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
  async getAllCards() {
    const response = await fetch(`${baseURL}/all`);
    const data = await convertToJson(response);
    return data;
  }
  async findCardById(id) {
    const response = await fetch(`${baseURL}/all`);
    const product = await convertToJson(response);
    return product.Result;
  }
}
