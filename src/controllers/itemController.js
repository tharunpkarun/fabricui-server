const Item = require("../models/itemModel");

module.exports = {
  getItems: (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    Item.getItems(limit, offset, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  createItem: (req, res) => {
    const { name, email, profile_image, resume, status, card_id } = req.body;
    Item.createItem({ name, email, profile_image, resume, status, card_id }, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(data);
    });
  },

  updateItem: (req, res) => {
    const id = req.params.id;
    const { name, email, profile_image, resume, status, card_id } = req.body;

    // Retrieve the current item data first
    Item.getItemById(id, (err, currentItem) => {
      if (err || !currentItem) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Merge the existing data with the new data
      const updatedData = {
        name: name || currentItem.name,
        email: email || currentItem.email,
        profile_image: profile_image || currentItem.profile_image,
        resume: resume || currentItem.resume,
        status: status || currentItem.status,
        card_id: card_id || currentItem.card_id,
      };

      // Update the database
      Item.updateItem(id, updatedData, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
      });
    });
  },

  deleteItem: (req, res) => {
    const id = req.params.id;
    Item.deleteItem(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).send();
    });
  },

  getCards: (req, res) => {
    res.json(Item.getCards());
  },
};
