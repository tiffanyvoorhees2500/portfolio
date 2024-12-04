function renderCard(card, parentElement) {
  console.log(card);
  // Element for the card
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'card-linkable', 'flip-card');

  // Element for the inner container that is needed to position the front and back side
  const cardInnerElement = document.createElement('div');
  cardInnerElement.classList.add('flip-card-inner');

  // Element for the Front cardface
  const cardFrontElement = document.createElement('div');
  cardFrontElement.classList.add('card__face', 'card__face--front');

  // Image element for the front
  const frontImageElement = document.createElement('img');
  frontImageElement.classList.add('card__face--image');
  frontImageElement.src = card.Image;
  frontImageElement.alt = `Image of ${card.Name}`;
  frontImageElement.width = 150;
  frontImageElement.height = 200;

  // Heading for the front
  const frontHeadingElement = document.createElement('h3');
  frontHeadingElement.textContent = card.Name;

  // Element for the Back cardface
  const cardBackElement = document.createElement('div');
  cardBackElement.classList.add('card__face', 'card__face--back');

  // Heading for the Back
  const backHeadingElement = document.createElement('h3');
  backHeadingElement.textContent = card.Name;

  // Paragraph Text for the back
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = card.Body_Text;

  // Append Children to back of card
  cardBackElement.appendChild(backHeadingElement);
  cardBackElement.appendChild(paragraphElement);

  // Append Children to front of card
  cardFrontElement.appendChild(frontImageElement);
  cardFrontElement.appendChild(frontHeadingElement);

  // Append Front and back to the inner card
  cardInnerElement.appendChild(cardFrontElement);
  cardInnerElement.appendChild(cardBackElement);

  // Append Inner Card Element to the card Element
  cardElement.appendChild(cardInnerElement);

  parentElement.appendChild(cardElement);
}

export default class CardListing {
  constructor(dataSource, parentElement) {
    this.dataSource = dataSource;
    this.parentElement = parentElement;
  }

  async init() {
    const cards = await this.dataSource.getAllCards();
    cards.forEach((card) => {
      renderCard(card, this.parentElement);
    });
  }
}
