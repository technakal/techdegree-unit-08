'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Every book entry must include a title.',
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Every book entry must include an author.',
          },
        },
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {}
  );
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
