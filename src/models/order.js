const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'ticketType', required: true },
    quantityUsed: { type: Number, required: true },
    ticketName: { type: String, required: true }, 
    price: { type: Number, required: true } 
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;