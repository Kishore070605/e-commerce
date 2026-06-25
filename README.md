# 🛒 MERN E-Commerce Website

A simple E-Commerce website built using the **MERN Stack**. This project was created to practice full-stack web development using React, Node.js, Express.js, and MongoDB.

## 🚀 Features

* User Registration
* User Login
* JWT Authentication
* View Products
* Search Products
* Add Products (Admin)
* Edit Products
* Delete Products
* Upload Product Images
* Add Products to Cart
* Responsive Design

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Cookie Parser
* Helmet

## 📂 Project Structure

```
ecommerce/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── model/
│   ├── router/
│   ├── middlewear/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kishore070605/ecommerce.git
```

### 2. Go to the Project Folder

```bash
cd ecommerce
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

## 🔑 Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
jwt_sec_key=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```


## 📚 What I Learned

While building this project, I learned:

* React Basics
* React Router
* Context API
* REST APIs
* Node.js & Express
* MongoDB & Mongoose
* JWT Authentication
* File Upload using Multer
* CRUD Operations
* Full-Stack Development

## 🎯 Future Improvements

* Online Payment Integration
* Wishlist Feature
* Product Reviews
* Order History
* Email Notifications

## 👨‍💻 Author

**Kishore S**

Learning MERN Stack Development 🚀

## 📄 License

This project is for learning purposes.
