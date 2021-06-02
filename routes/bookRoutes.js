const bookController = require("../controllers/bookController");
const router = require('express').Router();

 // Create a new Book
router.post("/", bookController.create);

// Retrieve all bookController
router.get("/", bookController.findAll);

// Retrieve all published bookController
router.get("/published", bookController.findAllPublished);

// Retrieve a single Book with id
router.get("/:id", bookController.findOne);

// Update a Book with id
router.put("/:id", bookController.update);

// Delete a Book with id
router.delete("/:id", bookController.delete);

// Delete All Book
router.delete("/", bookController.deleteAll);

// app.use('/api/book', router);
module.exports = router;