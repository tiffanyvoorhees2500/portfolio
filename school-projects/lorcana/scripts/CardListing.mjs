import CardDetails from './CardDetails.mjs';

function renderCard(card, parentElement, dataSource) {
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
  frontImageElement.width = 245;
  frontImageElement.height = 260;
  frontImageElement.loading = 'lazy';

  // Element for the Back cardface
  const cardBackElement = document.createElement('div');
  cardBackElement.classList.add('card__face', 'card__face--back');

  // Heading for the Back
  const backHeadingElement = document.createElement('h3');
  backHeadingElement.textContent = card.Name;

  // StartDeck description
  const startDeckElement = document.createElement('p');
  startDeckElement.classList.add('italic-text');
  startDeckElement.innerHTML = `${card.Type} card from '${card.Set_Name}'`;

  
  // Body of back of card
  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');

  const topDividerElement = document.createElement('hr');

  // Paragraph Text for the back
  const paragraphElement = document.createElement('p');
  paragraphElement.classList.add('support-text');
  paragraphElement.textContent = card.Body_Text;

  // Additional paragraph text if available
  const additionalParaElement = document.createElement('p');
  additionalParaElement.classList.add('italic-text', 'support-text');
  additionalParaElement.textContent = card.Flavor_Text;

  // Add a divider
  const dividerElement = document.createElement('hr');

  cardBodyElement.appendChild(topDividerElement);
  cardBodyElement.appendChild(paragraphElement);
  cardBodyElement.appendChild(additionalParaElement);
  cardBodyElement.appendChild(dividerElement);


  // Button to see more details & button to add to collection
  const buttonDivElement = document.createElement('div');
  buttonDivElement.classList.add('button-div', 'card-footer');

  // Heart Button to add to favorites collection (local storage)
  const heartButton = document.createElement('button');
  heartButton.classList.add('lorcana-btn-sm');
  heartButton.textContent = '❤️';

  // Details button to see all the details in a modal
  const detailsLink = document.createElement('a');
  detailsLink.id = 'lorcana-detail-btn';
  detailsLink.classList.add('lorcana-btn-sm', 'lorcana-btn-text');
  detailsLink.href = '#lorcana-detail-modal';
  detailsLink.textContent = 'More details...';
  detailsLink.addEventListener('click', () => {
    const cardDetailsParent = document.getElementById('card-details-list');
    const cardDetails = new CardDetails(card.Name, dataSource, cardDetailsParent);
    cardDetails.init();
  });

  // Add Button to add to collection (local storage)
  const collectionButton = document.createElement('button');
  collectionButton.classList.add('lorcana-btn-sm');
  collectionButton.textContent = '⭐';

  //Append buttons to the buttonDivElement
  buttonDivElement.appendChild(heartButton);
  buttonDivElement.appendChild(detailsLink);
  buttonDivElement.appendChild(collectionButton);

  // Append Children to back of card
  cardBackElement.appendChild(backHeadingElement);
  cardBackElement.appendChild(startDeckElement);
  cardBackElement.appendChild(cardBodyElement);
  cardBackElement.appendChild(buttonDivElement);

  // Append Children to front of card
  cardFrontElement.appendChild(frontImageElement);

  // Append Front and back to the inner card
  cardInnerElement.appendChild(cardFrontElement);
  cardInnerElement.appendChild(cardBackElement);

  // Append Inner Card Element to the card Element
  cardElement.appendChild(cardInnerElement);

  // Append everything to parent element
  parentElement.appendChild(cardElement);
}

export default class CardListing {
  constructor(dataSource, parentElement) {
    this.dataSource = dataSource;
    this.parentElement = parentElement;
    this.pagesize = 30;
    this.page = 1;
    this.fetchType = 'all';
    this.filterParams = {};
  }

  async init() {
    const cards = await this.dataSource.getPaginatedCards(this.pagesize, this.page);
    cards.forEach((card) => {
      renderCard(card, this.parentElement, this.dataSource);
    });
  }

  async getFilteredCards() {
    this.pagesize = 30;
    this.page = 1;
    this.fetchType = 'fetch';

    // Setting filters based on select input elements
    const setName = document.getElementById('filterCardsSets').value;
    if (setName !== '') {
      this.filterParams.Set_Name = setName;
    } else {
      delete this.filterParams.Set_Name;
    }
    const color = document.getElementById('filterCardsColors').value;
    if (color !== '') {
      this.filterParams.Color = color;
    } else {
      delete this.filterParams.Color;
    }

    // use filtered items to get new list of cards to render
    const cards = await this.dataSource.getPaginatedCards(this.pagesize, this.page, this.fetchType, this.filterParams);
    // Clear out previous cards
    this.parentElement.innerHTML = '';
    cards.forEach((card) => {
      renderCard(card, this.parentElement, this.dataSource);
    });
  }

  async loadMoreCards() {
    this.page++;
    const newCards = await this.dataSource.getPaginatedCards(this.pagesize, this.page, this.fetchType, this.filterParams);
    newCards.forEach((card) => {
      renderCard(card, this.parentElement, this.dataSource);
    });
  }
}
