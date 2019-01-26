const express = require('express');
const router = express.Router();

const Book = require('../models').Book;

/**
 * Return all books in the database to the user.
 * uses index.pug
 */
router.get('/', (req, res) => {
  Book.findAll({ order: [['title', 'ASC']] })
    .then(books => {
      if (books) {
        res.render('index', {
          books: books,
        });
      } else {
        res.render('not_found');
      }
    })
    .catch(err => {
      res.render('error');
    });
});

/**
 * Provide entry form for the user to create a new book.
 * uses new-book.pug
 */
router.get('/new', (req, res) => {
  res.render('new_book', {
    book: Book.build(),
    title: 'Create New Book',
  });
});

/**
 * Create a new book in the database.
 */
router.post('/', (req, res, next) => {
  console.log(req.body);
  Book.create(req.body)
    .then(book => {
      res.redirect(`/books/${book.id}`);
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.render('/books/new', {
          book: Book.build(req.body),
          errors: err.errors,
        });
      } else {
        throw err;
      }
    })
    .catch(err => res.render('error'));
});

/**
 * Return the record of a single book.
 * uses index.pug
 * @param {string} id - The id of the book.
 */
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) {
        res.render('book_detail', {
          book: book,
        });
      } else {
        res.render('not_found');
      }
    })
    .catch(err => {
      res.render('error');
    });
});

/**
 * Update the book record with id.
 * @param {string} id - The id of the book.
 */
router.post('/:id', (req, res) => {
  const bookId = req.params.id;
  res.redirect(`/books/${bookId}`);
});

/**
 * Delete the book record with id.
 * @param {string} id - The id of the book.
 */
router.post('/:id/delete', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) {
        return book.destroy();
      } else {
        res.render('not_found');
      }
    })
    .catch(err => res.render('error'));
  res.redirect('/books');
});

module.exports = router;
