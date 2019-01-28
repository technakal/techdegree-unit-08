const body = document.querySelector('body');
const books = {
  initialBooks: [],
  filteredBooks: [],
};

const pullBookInfo = bookNode => {
  const parts = bookNode.querySelectorAll('td');
  return {
    title: parts[0].textContent,
    href: parts[0].firstElementChild.href,
    author: parts[1].textContent,
    genre: parts[2].textContent,
    year: parts[3].textContent,
  };
};

/**
 * Creates a template literal string for the book.
 * @param {object} book - The book object, containing title, href, author, genre, and year attributes.
 * @returns Book template literal.
 */
const createBook = ({ title, href, author, genre = '', year = '' }) => {
  return `<tr>
      <td><a href=${href}>${title}</a></td>
      <td>${author}</td>
      <td>${genre}</td>
      <td>${year}</td>
    </tr>`;
};

/**
 * Displays the results of a filtering process, either search or pagination.
 * @param {array} results - The array containing the template literals for the table rows.
 */
const displayResults = results => {
  const table = document.querySelector('table');
  const noResults = document.querySelector('#noResults');
  if (results.length > 0) {
    table.classList.remove('hidden');
    noResults.className = 'hidden';
    table.querySelector('tbody').innerHTML = results;
  } else {
    table.className = 'hidden';
    noResults.classList.remove('hidden');
  }
};

/*******************************************
 * SEARCH COMPONENT
 ******************************************/

/**
 * Handles the functions that get the search bar working.
 */
const setUpSearch = () => {
  displaySearchBar();
  const searchBar = document.querySelector('#search');
  searchBar.value = '';
  searchBar.addEventListener('keyup', performSearch);
};

/**
 * Makes the search bar visible.
 */
const displaySearchBar = () => {
  const searchDiv = document.querySelector('.search');
  searchDiv.className = 'search';
};

/**
 * Searches the catalogue for books matching the input value.
 * Searches title, author, genre, and year
 * Can find partial matches.
 * Case insensitive.
 * @param {event} e - The triggering event.
 */
const performSearch = e => {
  const searchTerm = e.target.value.toLowerCase();
  const newBooks = [];
  books.initialBooks.forEach(book => {
    const bookObject = pullBookInfo(book);
    if (
      bookObject.title.toLowerCase().includes(searchTerm) ||
      bookObject.author.toLowerCase().includes(searchTerm) ||
      bookObject.genre.toLowerCase().includes(searchTerm) ||
      bookObject.year.includes(searchTerm)
    ) {
      newBooks.push(createBook(bookObject));
    }
  });
  displayResults(newBooks.join(''));

  if (newBooks.length > 0) {
    books.filteredBooks = document.querySelectorAll('tbody tr');
  } else {
    books.filteredBooks = [];
  }

  addPagination(books.filteredBooks);
  setActivePage(1);
};

/*******************************************
 * PAGINATION COMPONENT
 ******************************************/

/**
 * Create a single card element.
 * @param {number} num - The page number to display on the card.
 */
const createPageCard = num => {
  return `<li>${num}</li>`;
};

/**
 * Create page cards corresponding to the number of books on display.
 * One card for every ten books.
 * @param {array} books - The array of books to make cards for.
 * @returns Template literal for the cards.
 */
const createPageCardList = bookList => {
  const pageCount = Math.ceil(bookList.length / 10);
  const pageCards = [];
  pageCards.push(`<ul>`);
  for (let page = 1; page <= pageCount; page++) {
    pageCards.push(createPageCard(page));
  }
  pageCards.push(`</ul>`);
  return pageCards.join('');
};

/**
 * Display the list of pagination cards to the DOM.
 * @param {string} cardList - The template literal string corresponding to the card list to display.
 */
const displayPageCards = cardList => {
  const pageContainer = document.querySelector('.pagination');
  pageContainer.innerHTML = cardList;
};

/**
 * Perform the necessary activities to add pagination to the DOM.
 * Create cards for each page.
 * Toggle the visibility of the pagination container.
 * Display the pagination results.
 * @param {HTMLCollection} books - The books currently in the DOM.
 */
const addPagination = bookList => {
  const pageContainer = document.querySelector('.pagination');
  if (bookList.length > 0) {
    pageContainer.className = 'pagination';
  } else {
    pageContainer.className = 'pagination hidden';
    pageContainer.innerHTML = '';
  }
  const cardList = createPageCardList(bookList);
  displayPageCards(cardList);
  pageContainer.addEventListener('click', handlePaginationClick);
};

/**
 * If the click event is on the pagination button, set the active page.
 * @param {event} e - The triggering event, a click on the pagination button.
 */
const handlePaginationClick = e => {
  e.preventDefault();
  if (e.target.tagName === 'LI') {
    setActivePage(e.target.textContent);
  }
};

/**
 * Sets the min and max values for the pagination function.
 * @param {number} pageNum - The page number of the clicked pagination button.
 * @returns Min and max values for the books to display.
 */
const setPageRange = pageNum => {
  const min = (pageNum - 1) * 10;
  let max;
  min + 10 > books.filteredBooks.length
    ? (max = books.filteredBooks.length)
    : (max = min + 10);
  return { min, max };
};

/**
 * Filters the book list based on the clicked pagination button.
 * Displays any books in the filteredBooks array that have an index between the min and max.
 * @param {number} pageNum - The page number of the clicked pagination button.
 */
const setActivePage = pageNum => {
  const { min, max } = setPageRange(pageNum);
  const currentPage = [];

  for (let i = min; i < max; i++) {
    const bookObject = pullBookInfo(books.filteredBooks[i]);
    const book = createBook(bookObject);
    currentPage.push(book);
  }

  displayResults(currentPage.join(''));
};

/**
 * Monitor the DOM to make sure the results table appears before appending search or pagination functions.
 */
const interval = setInterval(() => {
  if (document.querySelector('table') !== undefined) {
    books.initialBooks = document.querySelectorAll('tbody tr');
    books.filteredBooks = books.initialBooks;
    addPagination(books.initialBooks);
    setActivePage(1);
    setUpSearch();
    clearInterval(interval);
  }
}, 500);
