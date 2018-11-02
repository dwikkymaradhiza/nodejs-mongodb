const mongoose = require('mongoose');
const { Schema } = require('./schemas/inbox');

const Inbox = new mongoose.Schema(Schema, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Inbox', Inbox);
