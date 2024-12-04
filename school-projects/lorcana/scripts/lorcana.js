import CardListing from './CardListing.mjs';
import { loadHeaderFooter } from '../../../scripts/utils.js';
import ExternalServices from './ExternalServices.mjs';

// Load the main tiffanyvoorhees.com header and footer
loadHeaderFooter();

const dataSource = new ExternalServices();
const listElement = document.querySelector('.card-container-inner');
const cardListings = new CardListing(dataSource, listElement);
cardListings.init();
