# 🛒 Eatopia

**Eatopia** is a fullstack MERN (MongoDB, Express.js, React, Node.js) eCommerce web application that offers a rich online marketplace for food, fruits, vegetables, wine, and bakery products. It allows sellers to manage products and users to browse, add to cart, and place orders using cash on delivery or secure online payment through Stripe.

## 🌐 Live Demo

- **Frontend (React)**: [https://eatopia-frontend.vercel.app](https://eatopia-frontend.vercel.app)
- **Backend (Express)**: [https://eatopia-backend.onrender.com](https://eatopia-backend.onrender.com)

## 📂 GitHub Repository

- [Eatopia Fullstack Repo](https://github.com/FrankezeCode/eatopia-fullstack)

## 📌 Features

### 🛍️ User Side
- User registration and login with JWT
- Browse categorized food products
- Add items to cart and checkout
- Select payment method: Cash on Delivery or Stripe
- View order history and saved address

### 🧑‍🍳 Seller/Admin Side
- Secure login to admin portal
- Add/manage product listings
- Monitor all orders
- Toggle product stock availability

## 🔧 Tech Stack

| Frontend       | Backend         | Database & Storage   | Other Tools      |
|----------------|------------------|------------------------|------------------|
| React          | Express.js       | MongoDB Atlas          | Cloudinary (image uploads) |
| Tailwind CSS   | Node.js          | Mongoose               | Stripe (payment gateway) |
| React Router   | CORS             |                        | dotenv (env configs) |
| Axios          | JWT / bcryptjs   |                        | Nodemon (dev) |

## 🔐 Authentication

- JWT-based authentication stored in **HTTP-only cookies**
- Context API handles login state on the frontend
- `is-auth` middleware protects private routes (both frontend and backend)

## 🧾 API Endpoints

### 🛒 Cart & Address
- `POST /api/address/add` – Add shipping address
- `GET /api/address/get` – Get saved address
- `POST /api/cart/update` – Update user cart data

### 📦 Orders
- `POST /api/order/cod` – Place order with Cash on Delivery
- `POST /api/order/stripe` – Place order using Stripe
- `POST /stripe` – Stripe webhook to verify payment
- `GET /api/order/user` – Get all orders by user
- `GET /api/order/seller` – Get all orders (admin)

### 🧁 Products
- `POST /api/product/add` – Add product (admin)
- `GET /api/product/list` – Get all products
- `GET /api/product/id` – Get product by ID
- `PUT /api/product/stock` – Change stock status

### 👤 Seller
- `POST /api/seller/login` – Login seller/admin
- `GET /api/seller/is-auth` – Check seller auth
- `GET /api/seller/logout` – Logout seller

### 👥 User
- `POST /api/user/register` – Register user
- `POST /api/user/login` – Login user
- `GET /api/user/is-auth` – Check user auth
- `GET /api/user/logout` – Logout user

## 🧭 Frontend Workflow

- **Auth**: Uses JWT cookies to maintain login across sessions
- **State Management**: React Context API
- **Axios**: Handles HTTP requests with `axios.defaults.withCredentials = true`
- **Routing**: `react-router-dom` for protected and public routes
- **UI**: TailwindCSS for responsive design and modern look
- **Checkout**: Option to pay via Cash on Delivery or Stripe

## 🚀 Deployment

- **Frontend**: Vercel (`https://eatopia-frontend.vercel.app`)
- **Backend**: Render (`https://eatopia-backend.onrender.com`)
- **MongoDB Atlas**: For cloud database
- **Cloudinary**: Image hosting for product uploads

## 📁 Folder Structure

```
eatopia-fullstack/
├── client/             # React Frontend
│   └── ...             
└── server/             # Express Backend
    ├── controllers/
    ├── routes/
    ├── configs/
    ├── middlewares/
    └── server.js
```

## 📌 Environment Variables (.env)

**Backend**
```env
PORT=4000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
SELLER_EMAIL=your_admin_email
SELLER_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
STRIPE_SECRET_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx
NODE_ENV=production
```

**Frontend**
```env
VITE_BACKEND_URL=https://eatopia-backend.onrender.com
VITE_CURRENCY=$
```

## 🤝 Contribution

Contributions are welcome! Feel free to fork and submit a PR.

## 📜 License

MIT © [FrankezeCode](https://github.com/FrankezeCode)
