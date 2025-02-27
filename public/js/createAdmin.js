require('dotenv').config(); 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../src/models/user'); 

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const existingAdmin = await User.findOne({ email: 'admin@ticketnow.com' });
        if (existingAdmin) {
            console.log("Administrador já existe.");
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: "Administrador",
            email: "admin@ticketnow.com",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Administrador criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar admin:", error);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin();
