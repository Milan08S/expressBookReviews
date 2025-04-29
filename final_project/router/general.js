const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
        .status(401)
        .json({error: 'Username and password are required'});
    }

    let user = isValid(username);
    if(user){
        return res
        .status(401)
        .json({error: 'The user is already created'});
    }

    users.push({"username": username, "password": password});

    user = users.filter((user) => {
        return (user.username == username);
    });

    return res.json(user);


});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[parseInt(isbn, 10)];

    if (!book) {
        return res
        .status(401)
        .json({error: `Book with ISBN: ${isbn} not found`});
    }

    return res.json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const authorForBooks = {};

    for (let book in books) {
        if (books[book].author == author )
        {
            authorForBooks[book] = {
                ...books[book]
            }
        }
    }

    res.json(authorForBooks);

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksWithTitles = {};

    for (let book in books) {
        if (books[book].title == title )
        {
            booksWithTitles[book] = {
                ...books[book]
            }
        }
    }

    res.json(booksWithTitles);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const review = books[isbn].review;

    if (!review) {
        return res
        .status(401)
        .json({error: 'The book has no reviews'});
    }

    return res.json(review);
});

module.exports.general = public_users;
