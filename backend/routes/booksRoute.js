import express from 'express'; 
import { Book } from '../models/bookModel.js'; 
const router = express.Router();

router.post('/', async (req, res) => {  
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publish year"
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Internal server error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ count: books.length, data: books });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        return res.status(200).json({ data: book });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send all required fields: title, author, publish year" });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) return res.status(404).json({ message: "Book not found" });

        return res.json({ message: "Book updated successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: "Book not found" });

        return res.status(200).json({ message: "Book Deleted" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
