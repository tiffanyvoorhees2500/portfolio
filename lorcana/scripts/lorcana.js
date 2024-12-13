import CardListing from './CardListing.mjs';
import { loadHeaderFooter } from '../../scripts/utils.js';
import ExternalServices from './ExternalServices.mjs';

// Load the main tiffanyvoorhees.com header and footer
loadHeaderFooter();

const dataSource = new ExternalServices();
const listElement = document.querySelector('.card-container-inner');

const cardListings = new CardListing(dataSource, listElement);
cardListings.init();

// Set the event listener for the load more cards button
const loadButton = document.querySelector('#load-button');
loadButton.addEventListener('click', () => {
  cardListings.loadMoreCards();
});

// Set the event listener for the search button
const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', () => {
  cardListings.getFilteredCards();
})

// // Set the event listener for the filterCardsSearch input Element
// const filterCardsSearchElement = document.querySelector('#filterCardsSearch');
// filterCardsSearchElement.addEventListener('change', () => {
//   cardListings.searchForCardByName();
// });

// // Set the event listener for the filterCardsSets select Element
// const filterCardsSetsElement = document.querySelector('#filterCardsSets');
// filterCardsSetsElement.addEventListener('change', () => {
//   cardListings.getFilteredCards();
// });

// // Set the event listener for the filterCardsColor select Element
// const filterCardsColorElement = document.querySelector('#filterCardsColors');
// filterCardsColorElement.addEventListener('change', () => {
//   cardListings.getFilteredCards();
// });

// // Set the event listener for the filterCardsRarity select Element
// const filterCardsRarityElement = document.querySelector('#filterCardsRarity');
// filterCardsRarityElement.addEventListener('change', () => {
//   cardListings.getFilteredCards();
// });