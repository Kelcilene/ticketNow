require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.json());

const authRouter = require('./routes/authRoutes');
const ticketsRouter = require('./routes/ticketRoutes');
const ordersRouter = require('./routes/orderRoutes');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB conectado!'))
    .catch(err => console.error('❌ Erro ao conectar:', err));

app.get('/history', (req, res) => {
    res.render('history', { title: 'Histórico de Tickets' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/ticket', (req, res) => {
    res.render('ticket', { title: 'Tickets' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Registrar Usuário' });
});

app.get('/manageTickets', (req, res) => {
    res.render('manageTickets', { title: 'Areá do gestor' });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/auth', authRouter);
app.use('/tickets', ticketsRouter);
app.use('/orders', ordersRouter);

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));