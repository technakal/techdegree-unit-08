const body = document.querySelector('body');
let books;

/**
 * Handles the functions that the search bar working.
 */
const setUpSearch = () => {
  const searchDiv = document.querySelector('.search');
  appendSearch();
  const searchBar = searchDiv.querySelector('input');
  searchBar.addEventListener('keyup', performSearch);
};

/**
 * Creates and appends the search bar.
 */
const appendSearch = () => {
  const searchDiv = document.querySelector('.search');
  if (searchDiv) {
    const searchBar = `
      <label for="search">Search</label>
      <input id="search" name="search" type="search" placeholder="Enter title, author, genre, or year..." />`;
    searchDiv.innerHTML = searchBar;
  }
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
  books.forEach(book => {
    const parts = book.querySelectorAll('td');
    const title = parts[0].textContent;
    const href = parts[0].firstElementChild.href;
    const author = parts[1].textContent;
    const genre = parts[2].textContent;
    const year = parts[3].textContent;
    if (
      title.toLowerCase().includes(searchTerm) ||
      author.toLowerCase().includes(searchTerm) ||
      genre.toLowerCase().includes(searchTerm) ||
      year.includes(searchTerm)
    ) {
      newBooks.push(
        `<tr>
           <td><a href=${href}>${title}</a></td>
           <td>${author}</td>
           <td>${genre}</td>
           <td>${year}</td>
        </tr>`
      );
    }
  });

  /**
   * If there are any books remaining in the table after the search, display them.
   * Replaces full list in the DOM only.
   */
  if (newBooks.length > 0) {
    // If the table element exists, add the results to the table.
    if (document.querySelector('table') !== null) {
      document.querySelector('tbody').innerHTML = newBooks.join('');

      // if not, remove the table.
    } else {
      body.removeChild(body.lastElementChild);
      const tableElement = document.createElement('table');
      const table = `
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
      `;
      newBooks.unshift(table);
      newBooks.push(`</tbody>`);
      tableElement.innerHTML = newBooks.join('');
      document.querySelector('body').appendChild(tableElement);
    }
    /** If there are no books remaining in the list, remove the table element.
     * Add the "no results" message to the DOM.
     */
  } else {
    if (body.querySelector('table') !== null) {
      body.removeChild(document.querySelector('table'));
    }
    if (body.lastElementChild.tagName !== 'H4') {
      const noResult = document.createElement('h4');
      noResult.textContent = 'Sorry! No books match that search.';
      body.appendChild(noResult);
    }
  }
};

/**
 * Monitor the DOM to make sure the results table appears before appending search or pagination functions.
 */
const interval = setInterval(() => {
  if (document.querySelector('table') !== undefined) {
    books = document.querySelectorAll('tbody tr');
    setUpSearch();
    clearInterval(interval);
  }
}, 500);
