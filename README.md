# 🛒 MERN E-Commerce App

A **fully-featured e-commerce application** built with the **MERN stack**:  
MongoDB, Express.js, React.js, and Node.js.

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</p>

---

## ✨ Features

- 🔐 **User Authentication** (Register/Login with JWT)
- 🛍️ **Product Management** (CRUD operations for products)
- 🛒 **Shopping Cart** with quantity control
- 🧾 **Checkout & Payment Integration** (Stripe or other provider)
- 🧑‍💼 **Admin Dashboard** with product/user/order management
- 📱 **Mobile Responsive Design**
- 🌐 **REST API** for seamless front-end/back-end communication

---

## 🚀 Technologies Used

| Tech          | Description                          |
|---------------|--------------------------------------|
| MongoDB       | NoSQL database for storing products, users, orders |
| Express.js    | Backend framework for building REST API |
| React.js      | Frontend library with modern UI features |
| Node.js       | Server-side JavaScript runtime       |
| Stripe        | Payment gateway integration          |
| Tailwind CSS  | Utility-first CSS framework for fast UI |

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce-app-mern.git
cd ecomerce-app-mern
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

4. **Create Environment Variables**

Create a `.env` file in the `backend` folder and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

5. **Run the App**

- Backend:  
```bash
cd backend
npm run dev
```

- Frontend:  
```bash
cd frontend
npm start
```

- Admin:  
```bash
cd admin
npm run dev
```

---



## ❤️ Credits

Built with 💻 by [Asen Chochev](https://github.com/asenchochev)  

---

