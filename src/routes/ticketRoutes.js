const express = require('express');
const { buyTicket, getUserOrders, getTicketDetails, getAllTickets, manageTickets, createTicket, deleteTicket, editTicket } = require('../controllers/ticketController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/manage', authMiddleware, adminMiddleware, manageTickets);
router.post('/create', authMiddleware, adminMiddleware, createTicket);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteTicket);
router.put('/edit/:id', authMiddleware, adminMiddleware, editTicket);

router.post('/buy', authMiddleware, buyTicket);
router.get('/history', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getTicketDetails);
router.get('/', authMiddleware, getAllTickets);

module.exports = router;