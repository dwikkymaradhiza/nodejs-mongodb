const express = require('express');
const router = express.Router();
const inbox = require('./../app/controllers/inbox');

// Inbox Routes
router.post('/inbox', inbox.create);
router.get('/inbox', inbox.getAll);

module.exports = router;
