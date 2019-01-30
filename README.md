# Library Catalogue Search

**Techdegree Unit 08**

## Requirements

A web application for managing a library's collection of books. Uses a JavaScript (node and Express) server and a SQLite database.

### User Stories

1. As a librarian, I can list books in the collection.
2. As a librarian, I can add books to the collection.
3. As a librarian, I can update books that are already in the collection.
4. As a librarian, I can delete books from the collection.

### Specifications

#### Priority 1

1. The Library_Catalogue shall use the following technologies;
   1. JavaScript
   2. Node.js
   3. Express
   4. Pug
   5. SQLite
   6. SQL ORM Sequelize.
2. `npm install` shall install all necessary packages.
3. `npm start` shall launch the Library_Catalogue.
4. The Library_Catalogue shall use the following npm packages:
   1. sequelize
   2. sequelize-cli
   3. sqlite3
   4. express
   5. pug
5. The Library_Catalogue shall use the Book_Table in the Library_Database.
6. The Book_Table shall have the following data columns:
   1. title: string
   2. author: string
   3. genre: string
   4. year: integer
7. The Book_Table shall require every book to have a title.
8. The Book_Table shall require every book to have a author.
9. The Library_Catalogue shall use the following Views:
   1. layout.pug - for the boilerplate markup that should be on every page.
   2. index.pug - for the main book listing page.
   3. new-book.pug - for the new book form.
   4. update-book.pug - for the update book form.
   5. error.pug - for displaying a user friendly error message.
   6. page-not-found.pug - for displaying a user friendly “Page Not Found” message.
10. The Library_Catalogue shall use Pug to render the Views.
11. The Library_Catalogue shall allow the user to access the following routes;
    1. GET /
    2. GET /books
    3. GET /books/new
    4. POST /books/new
    5. GET /books/:id
    6. POST /books/:id
    7. POST /books/:id/delete
12. The Home_Route shall redirect to the Books_Route.
13. The Books_Route shall display a list of all Books.
14. The New_Books_Route shall display the New_Book_Form.
15. The Library_Catalogue shall use Sequelize to validate entry in the New_Book_Form.
16. When {the user submits the New_Book_Form} AND {the New_Book_Form is missing the title or author}, the Library_Catalogue shall return an error to the user.
17. When the user submits the New_Book_Form, the Library_Catalogue shall add the Book to the Book_Table.
18. When the user successfully submits the New_Book_Form, the Library_Catalogue shall direct the user to the Book_Route for the New_Book.
19. The Update_Book_Route shall display the Update_Book_Form.
20. The Library_Catalogue shall use Sequelize to validate entry in the Update_Book_Form.
21. When {the user submits the Update_Book_Form} AND {the Update_Book_Form is missing the title or author}, the Library_Catalogue shall return an error to the user.
22. When the user submits the Update_Book_Form, the Library_Catalogue shall update the information of the Book.
23. When the user successfully submits the Update_Book_Form, the Library_Catalogue shall direct the user to the Book_Route for the Updated_Book.
24. When the user clicks on the label of an input field on the New_Book_Form or the Update_Book_Form, the Library_Catalogue shall focus on the input.
25. The Delete_Book_Route shall allow the user to delete the Book.
26. When the Library_Catalogue encounters an error, the Library_Catalogue shall {log the error to the server console} AND {shall display the Error.Route}.
27. When the user navigates to a Route that doesn't exist, the Library_Catalogue shall display the 404_Route.

#### Priority 2

25. The Books_Route shall display ten books per Page.
26. The Library_Catalogue shall allow the user to search for the Book by title, author, genre, and year.
27. The Search shall return partial matches.
28. The Search shall return matches, regardless of case.
29. When the Search fails to return any results, the Library_Catalogue shall return the No_Results_Route.

## Design

### Code Plan

1. Install the necessary npm packages:
   1. sequelize
   2. sequelize-cli
   3. sqlite3
   4. express
   5. pug
2. Initialize sequelize and create the Books model.

### Visual Design

#### Colors

#### Fonts
