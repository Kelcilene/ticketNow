const mongoose = require('mongoose');

const ticketTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    stockInitial: { type: String, required: true },
});

const Ticket = mongoose.model('ticketType', ticketTypeSchema);
module.exports = Ticket;