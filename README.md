# 📌 Documentação do Projeto **TicketFlow**

## 🚀 Introdução
O **TicketFlow** é um sistema de gerenciamento de ingressos, permitindo a compra e venda de tickets de forma segura e eficiente.

---

## 🛠️ Como Rodar o Projeto

### **1️⃣ Requisitos**
Antes de iniciar, certifique-se de ter instalado:
- ✅ **Node.js** (versão 16 ou superior)
- ✅ **MongoDB** (local ou Atlas)
- ✅ **NPM** ou **Yarn**
- ✅ **Um gerenciador de requisições** (Postman, Insomnia, etc.)

### **2️⃣ Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/ticketflow.git
cd ticketflow
```

### **3️⃣ Configurar as Variáveis de Ambiente**
Crie um arquivo **.env** na raiz do projeto e adicione as seguintes variáveis:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ticketflow
JWT_SECRET=sua_chave_secreta
```
Se estiver usando o MongoDB Atlas, substitua **MONGO_URI** pela string de conexão da sua instância.

### **4️⃣ Instalar Dependências**
```sh
npm install  # ou yarn install
```

### **5️⃣ Iniciar o Servidor**
```sh
npm start  # ou yarn start
```
🔗 O servidor será iniciado em `http://localhost:5000`.

---

## 👤 **Criando um Usuário Admin**
Para criar um usuário administrador, utilize o script `createAdmin.js` localizado em **public/js**.

### **📌 Passos para Criar um Admin:**
1️⃣ Abra o terminal e navegue até o diretório do projeto.
2️⃣ Execute o seguinte comando:
```sh
node public/js/createAdmin.js
```
3️⃣ Insira as informações solicitadas, como email e senha.
4️⃣ ✅ O usuário admin será criado no banco de dados.

---

## 🔗 **Endpoints Principais**

### **1️⃣ Autenticação**
#### 🔹 **Registro de Usuário**
- **🛣️ Rota:** `POST /auth/register`
- **📥 Corpo da requisição:**
```json
{
  "name": "Usuário Teste",
  "email": "teste@email.com",
  "password": "senha123"
}
```
- **📤 Resposta esperada:**
```json
{
  "message": "Usuário registrado com sucesso!",
  "token": "jwt_token"
}
```

#### 🔹 **Login**
- **🛣️ Rota:** `POST /auth/login`
- **📥 Corpo da requisição:**
```json
{
  "email": "teste@email.com",
  "password": "senha123"
}
```
- **📤 Resposta esperada:**
```json
{
  "message": "Login bem-sucedido!",
  "token": "jwt_token"
}
```

---

### **2️⃣ Compras de Ingressos**
#### 🎟️ **Comprar Ingresso**
- **🛣️ Rota:** `POST /tickets/buy`
- **🔑 Cabeçalho:**
  - `Authorization: Bearer {token}`
- **📥 Corpo da requisição:**
```json
{
  "ticketId": "123456789",
  "quantityUsed": 2
}
```
- **📤 Resposta esperada:**
```json
{
  "message": "Compra realizada com sucesso!",
  "order": {
    "user": "id_usuario",
    "ticket": "123456789",
    "quantityUsed": 2,
    "ticketName": "Show Banda X",
    "price": 100.0
  }
}
```

---

### **3️⃣ Listagem de Ingressos**
#### 📃 **Buscar Todos os Ingressos**
- **🛣️ Rota:** `GET /tickets`
- **📤 Resposta esperada:**
```json
[
  {
    "_id": "123456789",
    "name": "Show Banda X",
    "stock": 50,
    "price": 100.0
  }
]
```

---

## ⚠️ **Erros Comuns e Soluções**

1️⃣ **Erro: "Estoque insuficiente ou ingresso inválido"**
   - 🛠️ Verifique se o `ticketId` é válido e se há estoque suficiente.
   - 📌 Certifique-se de que `quantityUsed` está sendo enviado como número.

2️⃣ **Erro: "Token inválido ou expirado"**
   - 🔄 Confirme que o token JWT está correto e ainda é válido.
   - 🔑 Tente refazer o login.

---

## 🎯 **Conclusão**
Este documento cobre a configuração, execução e principais funcionalidades do **TicketFlow**. Para mais detalhes, consulte o código-fonte ou entre em contato com a equipe de desenvolvimento. 🚀
