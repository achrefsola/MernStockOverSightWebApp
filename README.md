# MERN Stock Management System

## Overview
This project is a **Stock Management System** built with the **MERN stack** (MongoDB, Express, React, Node.js). 
It provides a user-friendly interface for managing stock inventory, handling orders, tracking suppliers, and generating reports. 
The application is designed to help businesses efficiently monitor and update stock levels in real-time.

## Features
- **User Authentication & Authorization**: Secure login and registration with role-based access control.
- **Product Management**: Add, update, view, and delete products with details like stock number, supplier, category, etc.
- **Order Management**: Create and manage customer orders, automatically adjusting stock levels based on orders.
- **Supplier Management**: Track and manage supplier information, including contact details.
- **Dynamic Stock Updates**: Real-time adjustments to stock quantities with each order, modification, or restock.
- **Bill Generation**: Automatically generate bills for each order, with download and print options.


## Technologies Used
- **Frontend**: React (React Router for navigation, Context API for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Authentication**: JWT (JSON Web Tokens) for secure user sessions
- **Styling**: Bootstrap and custom CSS for a responsive UI

## Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (local or Atlas for cloud setup)
- **NPM** or **Yarn** for dependency management

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/achrefsola/MernStockOverSightWebApp
   cd MernStockOverSightWebApp
   ```
2.**Install Server Dependencies**
```bash
cd server
npm install
```
3. **Install Client Dependencies**
```bash
cd ../client
npm install
```
4. **Environment Variables**
Create a .env file in the server directory and add the following variables:

MONGODB_URI=<your_mongodb_connection_string>  
JWT_SECRET=<your_jwt_secret>  
PORT=5000  
5. **Running the Application**  
5.1 **Start the Server**  
In the server directory, run:  
```bash
npm start
```
5.2 **Start the Client**  
In the client directory, run:
```bash
npm start
```
6. **Access the App**  
Client: http://localhost:3000  
Server: http://localhost:5000  
7. **Usage**  
Register or Log In to access the dashboard.  

Manage Inventory: Navigate to Products to add, update, or delete items.  
Order Management: Use the Orders section to create new orders and automatically update stock levels.  
Supplier Tracking: Manage vendor information through the Suppliers section.  
Bill Generation: View and print bills for completed orders.  
Generate Reports: Monitor sales and stock levels to make data-driven decisions.  

##Contact  
For any questions or feedback about this project, please contact me at achrafsoula9@gmail.com.  
