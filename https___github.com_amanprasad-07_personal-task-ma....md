# **Personal Task Manager**

## **📋 Overview**

The **Personal Task Manager** is a full-stack web application designed to help users effectively manage their daily tasks and boost productivity. It allows users to create, read, update, and delete tasks, keeping track of their to-do list in a clean and intuitive interface.

## **🚀 Live Demo**

You can view the live deployment of this project here:

[**personal-task-manager-sepia.vercel.app**](https://personal-task-manager-sepia.vercel.app)

## ---

**✨ Features**

* **Task Creation:** Easily add new tasks with titles and descriptions.  
* **Task Management (CRUD):**  
  * View all active and completed tasks.  
  * Mark tasks as completed.  
  * Edit existing task details.  
  * Delete tasks permanently.  
* **User Interface:** A responsive and modern design for seamless use on desktop and mobile devices.  
* **Data Persistence:** Tasks are stored securely in a database.

## ---

**🛠️ Tech Stack**

This project is built using a modern JavaScript full-stack architecture (likely the MERN stack).

### **Frontend**

| Technology | Description |
| :---- | :---- |
| **React** (or similar framework) | For building the user interface. |
| **Vercel** | Deployment platform. |
| **HTML5 & CSS3** | Structure and styling (often with a framework like Tailwind CSS or styled-components). |

### **Backend**

| Technology | Description |
| :---- | :---- |
| **Node.js** | JavaScript runtime environment. |
| **Express.js** | Web application framework for the server-side API. |
| **MongoDB** | NoSQL database for flexible and scalable data storage. |
| **Mongoose** (or similar ODM) | Object Data Modeling library for MongoDB and Node.js. |

## ---

**⚙️ Installation and Setup**

Follow these steps to set up the project locally.

### **Prerequisites**

* Node.js (LTS version recommended)  
* npm (or yarn)  
* MongoDB installed locally or access to a cloud MongoDB cluster (e.g., MongoDB Atlas).

### **1\. Clone the Repository**

git clone https://github.com/amanprasad-07/personal-task-manager.git  
cd personal-task-manager

### **2\. Backend Setup**

The backend is located in the backend directory.

1. Navigate to the backend folder:  
   cd backend

2. Install dependencies:  
   npm install

3. Create a .env file in the backend directory and add your environment variables:  
   PORT=3000  
   MONGO\_URI="YOUR\_MONGO\_DB\_CONNECTION\_STRING"

   *Replace "YOUR\_MONGO\_DB\_CONNECTION\_STRING" with your actual MongoDB connection string.*  
4. Start the backend server:  
   npm start  
   \# or  
   npm run dev (if you use nodemon for development)

   The server should now be running at http://localhost:3000.

### **3\. Frontend Setup**

The frontend is located in the frontend directory.

1. Navigate to the frontend folder:  
   cd ../frontend

2. Install dependencies:  
   npm install

3. If necessary, create a .env file in the frontend directory to specify the backend API URL.  
   \# For a Vite app  
   VITE\_API\_BASE\_URL=http://localhost:3000/api

   \# For a Next.js or CRA the variable name may differ.

4. Start the frontend development server:  
   npm run dev

   The application should now be accessible in your browser, typically at http://localhost:3000.

## ---

**🤝 Contributing**

Contributions are welcome\! If you have suggestions for improvements or find a bug, please follow these steps:

1. Fork the repository.  
2. Create a new feature branch (git checkout \-b feature/AmazingFeature).  
3. Commit your changes (git commit \-m 'Add some AmazingFeature').  
4. Push to the branch (git push origin feature/AmazingFeature).  
5. Open a Pull Request.

## ---

**📄 License**

This project is licensed under the [**MIT License**](https://opensource.org/licenses/MIT) \- see the LICENSE file (if applicable) for details.