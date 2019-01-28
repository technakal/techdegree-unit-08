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
          pageTitle: 'Home | Brookville Public Library',
        });
      } else {
        res.render('not_found', {
          pageTitle: 'Not Found | Brookville Public Library',
        });
      }
    })
    .catch(err => {
      res.render('error', { pageTitle: 'Error | Brookville Public Library' });
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
    pageTitle: 'Create Book | Brookville Public Library',
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
        res.render('new_book', {
          book: Book.build(req.body),
          title: 'Create New Book',
          pageTitle: 'Create Book | Brookville Public Library',
          errors: err.errors,
        });
      } else {
        throw err;
      }
    })
    .catch(err =>
      res.render('error', { pageTitle: 'Error | Brookville Public Library' })
    );
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
          title: `Update "${book.title}"`,
          pageTitle: 'Update Book | Brookville Public Library',
        });
      } else {
        res.render('not_found', {
          pageTitle: 'Not Found | Brookville Public Library',
        });
      }
    })
    .catch(err => {
      res.render('error', { pageTitle: 'Error | Brookville Public Library' });
    });
});

/**
 * Update the book record with id.
 * @param {string} id - The id of the book.
 */
router.post('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.render('not_found', {
          pageTitle: 'Not Found | Brookville Public Library',
        });
      }
    })
    .then(book => {
      res.redirect(`/books/${book.id}`);
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let book = Book.build(req.body);
        book.id = req.params.id;
        res.render('book_detail', {
          book: book,
          title: `Update "${book.title}"`,
          errors: err.errors,
          pageTitle: 'Update Book | Brookville Public Library',
        });
      }
    });
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
        res.render('not_found', {
          pageTitle: 'Not Found | Brookville Public Library',
        });
      }
    })
    .catch(err => res.render('error'));
  res.redirect('/books');
});

module.exports = router;
