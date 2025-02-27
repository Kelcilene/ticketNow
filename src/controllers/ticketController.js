const Ticket = require('../models/ticketType');
const Order = require('../models/order');

exports.buyTicket = async (req, res) => {
    try {
        const { ticketId, quantityUsed } = req.body;
        const userId = req.user?.userId;

        const parsedQuantityUsed = Number(quantityUsed);
        if (isNaN(parsedQuantityUsed) || parsedQuantityUsed <= 0) {
            return res.status(400).json({ message: "Quantidade inválida." });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        if (ticket.stock < parsedQuantityUsed) {
            return res.status(400).json({ message: "Estoque insuficiente." });
        }

        ticket.stock -= parsedQuantityUsed;
        await ticket.save();

        const order = new Order({
            user: userId,
            ticket: ticketId,
            quantityUsed: parsedQuantityUsed,
            ticketName: ticket.name,
            price: ticket.price
        });

        await order.save();

        res.status(201).json({ message: "Compra realizada com sucesso!", order });
    } catch (error) {
        console.error("Erro na compra de ingresso:", error);
        res.status(500).json({ message: "Erro ao processar a compra." });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ user: userId }).populate('ticket');
        res.render('history', { orders });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar histórico", error });
    }
};

exports.getTicketDetails = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket)
            return res.status(404).json({ message: 'Ingresso não encontrado' });

        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar detalhes do ingresso' });
    }
};

exports.getAllTickets = async (req, res) => {
    const tickets = await Ticket.find();

    const isAuthenticated = req.user ? true : false;
    const isAdmin = req.user && req.user.role === 'admin';
    res.json({ tickets, isAuthenticated, isAdmin });
};

exports.manageTickets = async (req, res) => {
    const tickets = await Ticket.find();
    res.render('manageTickets', { tickets });
};

exports.createTicket = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const stockInitial = stock;
        const newTicket = new Ticket({ name, price, stock, stockInitial });
        await newTicket.save();
        res.redirect('/tickets/manage');
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ingresso", error });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket)
            return res.status(404).json({ message: "Ingresso não encontrado" });
        res.status(200).json({ message: "Ingresso removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover ingresso", error });
    }
};

exports.editTicket = async (req, res) => {
    try {
        const { price, stockInitial } = req.body;
        const stock = stockInitial;
        await Ticket.findByIdAndUpdate(req.params.id, { price, stockInitial, stock });
        res.redirect('/tickets/manage');
    } catch (error) {
        console.error("Erro ao editar ingresso:", error);
        res.status(500).json({ message: "Erro ao editar ingresso", error });
    }
};