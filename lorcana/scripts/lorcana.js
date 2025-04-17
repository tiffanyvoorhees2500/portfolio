import CardListing from './CardListing.mjs';
import { loadHeaderFooter } from '../../shared/scripts/utils.js';
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
