export default class CardDetails {
  constructor(cardName, dataSource, parentElement) {
    this.cardName = cardName;
    this.dataSource = dataSource;
    this.parentElement = parentElement;
    this.card = {};
  }

  async init() {
    // First things first... clear old card from modal
    const loadingSpinner = document.querySelector('.loading-div');
    loadingSpinner.style = 'display: block';
    // clear previous card elements
    const parentElement = this.parentElement;
    parentElement.innerHTML = '';

    this.card = await this.dataSource.getCardByName(this.cardName);
    this.renderCardDetails(this.card);
  }

  renderCardDetails(card) {
    // Set the card title
    const cardTitleElement = document.createElement('h1');
    cardTitleElement.textContent = card.Name;

    const franchiseParaElement = document.createElement('p');
    franchiseParaElement.classList.add('small-text');
    franchiseParaElement.textContent = `Franchise: ${card.Franchise}`;

    // Set the card image
    const cardImageElement = document.createElement('img');
    cardImageElement.classList.add('card__face--image');
    cardImageElement.src = card.Image;
    cardImageElement.alt = `Image of ${card.Name}`;
    cardImageElement.width = 150;
    cardImageElement.height = 175;
    cardImageElement.loading = 'lazy';

    // Set the image artist
    const artistElement = document.createElement('p');
    artistElement.classList.add('small-text');
    artistElement.textContent = `Artist: ${card.Artist}`;

    // StartDeck description
    const startDeckElement = document.createElement('p');
    startDeckElement.classList.add('italic-text');
    startDeckElement.innerHTML = `${card.Type} card from '${card.Set_Name}'`;

    const dividerElementOne = document.createElement('hr');

    // Paragraph Text for the back
    const paragraphElement = document.createElement('p');
    paragraphElement.classList.add('support-text');
    paragraphElement.textContent = card.Body_Text;

    // Additional paragraph text if available
    const additionalParaElement = document.createElement('p');
    additionalParaElement.classList.add('italic-text', 'support-text');
    additionalParaElement.textContent = card.Flavor_Text;

    // Add a divider
    const dividerElementTwo = document.createElement('hr');

    // Add a details heading
    const detailsHeaderElement = document.createElement('h2');
    detailsHeaderElement.textContent = 'Additional Details';

    // Add a details grid within the listitem
    const gridItem = document.createElement('div');
    gridItem.classList.add('detail-grid');

    const parentElement = this.parentElement;
    parentElement.appendChild(cardTitleElement);
    parentElement.appendChild(franchiseParaElement);
    parentElement.appendChild(cardImageElement);
    parentElement.appendChild(artistElement);
    parentElement.appendChild(startDeckElement);
    parentElement.appendChild(dividerElementOne);
    parentElement.appendChild(paragraphElement);
    parentElement.appendChild(additionalParaElement);
    parentElement.appendChild(dividerElementTwo);
    parentElement.appendChild(detailsHeaderElement);

    const loadingSpinner = document.querySelector('.loading-div');
    loadingSpinner.style = 'display: none';
  }
}
