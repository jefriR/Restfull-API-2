const db = require("../models");
const Book = db.books;

exports.create = async(req,res) => {
    if(!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create Instance
    const newBook = new Book({
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false,
    });

    try {
        const saveBook = await newBook.save();
        res.send({
            book: saveBook
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the book."
        });
    }
}

exports.findAll = async(req,res) => {
    const title = req.query.title;
    const conditions = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    try {
        const findBook = await Book.find(conditions);
        res.send(findBook);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the book."
        });
    }
}

exports.findOne = async(req,res) => {
    const id = req.params.id;

    try {
        const findBook = await Book.findById(id);
        if(!findBook) {
            res.status(404).send({ message: "Not found book with id " + id });
        } else {
            res.send(findBook);
        }
    } catch (err) {
        res.status(500).send({ message: "Error retrieving book with id=" + id });
    }    
}

exports.update = async(req,res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if(!updatedBook) {
            res.status(404).send({
                message: `Cannot update book with id=${id}. Maybe book was not found!`
            });
        } else {
            res.send({ message: "Book was updated successfully." });
        }
    } catch (err) {
        res.status(500).send({ message: "Error updating boook with id=" + id });
    }    
}

exports.delete = async(req,res) => {
    const id = req.params.id;

    try {
        const deleteBook = await Book.findByIdAndRemove(id);
        if(!deleteBook) {
            res.status(404).send({
                message: `Cannot delete book  with id=${id}. Maybe book was not found!`
            });
        } else {
            res.send({ message: "Book was deleted successfully." });
        }
    } catch (err) {
        res.status(500).send({ message: "Error updating book with id=" + id });
    }    
}

exports.deleteAll = async(req,res) => {
    try {
        const deleteBook = await Book.deleteMany();
        res.send({ message: `${data.deletedCount} Tutorials were deleted successfully!` });
    } catch (err) {
        res.status(500).send({ message: "Some error occurred while removing all book" });
    }  
}

exports.findAllPublished = async(req,res) => {
    try {
        const findBook = await Book.find({ published: true });
        res.send(findBook);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving tutorials."});
    } 
}
