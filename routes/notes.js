const express = require('express');
const router = express.Router();
const Note = require('../models/note');
// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a note
router.post('/', async (req, res) => {
    console.log("Request Body:", req.body);
  const note = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
