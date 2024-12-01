const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getItems);
router.get("/items/:id", itemController.getItem);
router.post('/items', itemController.createItem);
router.patch('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);
router.get('/cards', itemController.getCards);

module.exports = router;
