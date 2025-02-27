const Order = require('../models/order');
const TicketType = require('../models/ticketType');

exports.createOrder = async (req, res) => {
    try {
        const { tickets } = req.body;
        let total = 0;

        for (let item of tickets) {
            const ticket = await TicketType.findById(item.ticketType);
            if (!ticket || ticket.quantityUsed < item.quantityUsed) {
                return res.status(400).json({ message: "Estoque insuficiente para o ingresso: " + ticket.name });
            }
            total += ticket.price * item.quantityUsed;
            ticket.quantityUsed -= item.quantityUsed;
            await ticket.save();
        }

        const order = new Order({ user: req.user.userId, tickets, total });
        await order.save();

        res.status(201).json({ message: "Pedido criado com sucesso", order });
    } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        res.status(500).json({ message: "Erro ao criar o pedido", error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).populate('ticket');
        res.json(orders);
    } catch (error) {
        console.error("Erro ao buscar pedidos do usuário:", error);
        res.status(500).json({ message: "Erro ao buscar pedidos do usuário", error });
    }
};
