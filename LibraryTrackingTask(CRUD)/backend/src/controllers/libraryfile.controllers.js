const fileModel = require('../models/libraryfile.model');

// POST single image
const LibraryBookController = async (req, res) => {
  try {
    const userData = req.body;
    userData.bookImg=req.file.filename
    const storeData = new fileModel(userData);
    await storeData.save();

    return res.status(201).send({ message: "Data uploaded successfully", data: storeData });
  } catch (error) {
    return res.status(500).send({ message: "Error when uploading data" });
  }
};

// GET all books
const showBookController = async (req, res) => {
  try {
    const showBooks = await fileModel.find().sort({_id:-1});
    res.status(200).send({ data: showBooks });
  } catch (err) {
    res.status(500).send({ message: "Error when getting books" });
  }
};

// UPDATE book
const UpdateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedata = req.body;
    if (req.file) {
      updatedata.bookImg = req.file.filename;
    }
    const updateBook = await fileModel.findByIdAndUpdate(id, { ...updatedata }, { new: true });
    res.status(200).send({ data: updateBook });
  } catch (err) {
    res.status(500).send({ message: "Error when updating book" });
  }
};

// DELETE book
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    await fileModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error when deleting book" });
  }
};

module.exports = {
  LibraryBookController,
  showBookController,
  UpdateBookController,
  deleteBookController
};
