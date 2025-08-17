---

## ✅ `backend/README.md`

```md
⚡️ Dynamic Form Builder – Backend

# 🧠 Dynamic Airtable-Connected Form Builder (Backend)

This is the **backend** of a full-stack MERN application that powers dynamic form creation, conditional logic, and Airtable sync. Built with Node.js, Express, and MongoDB, it handles user authentication, form metadata, and Airtable API integration.

---

## 🚀 Live Backend

🔗 [https://dynamic-form-backend-gumc.onrender.com](https://dynamic-form-backend-gumc.onrender.com)

---

## 🛠 Tech Stack

- **Node.js**, **Express**
- **MongoDB Atlas**
- **Airtable API**
- **Render** (deployment)
- **Thunder Client** (API testing)

---

## 📦 Features

### ✅ Core Functionality

- RESTful API for user and form management
- Airtable field fetching and record creation
- Conditional logic validation
- MongoDB stores user and form metadata
- CORS setup for frontend integration

### 🎁 Bonus Features

- Graceful fallback if Airtable user object is missing
- Modular controller and route structure
- Dynamic owner tracking via JWT

---

## 🔐 Airtable Integration

> ⚠️ **Note on OAuth:**  
> For simplicity and faster demo setup, Airtable OAuth was skipped.  
> Instead, the app uses a direct Airtable API key and base/table config via `.env`.  
> The architecture is modular and can be extended to support OAuth if needed.

- Airtable fields are fetched dynamically
- Only supported field types are used:
  - Short text
  - Long text
  - Single select
  - Multi select
  - Attachment (File Upload)
- Form responses are saved as new records in Airtable

---

## 🧪 Conditional Logic

Backend validates conditional logic before saving form responses.  
Example: “GitHub URL” only appears if `Role = Engineer`.

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

````bash
git clone https://github.com/navyaarora30/dynamic-form-builder.git
cd dynamic-form-builder/backend

## 📁 Folder Structure

```text
dynamic-form-builder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── server.js
│   ├── README.md
│   ├── screenshots/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── screenshots/
│   ├── .env.example
│   ├── README.md
│   └── package.json
│
├── .env.example
├── README.md
````

---

2. Create .env File
   Copy the example file and fill in your credentials:
   cp .env.example .env

3. Install Dependencies
   Backend
   cd backend
   npm install
   npm start

### 🗄️ MongoDB Sync

[![MongoDB](./screenshots/mongodb-sync.png)](./screenshots/mongodb-sync.png)
Form data is stored in MongoDB with Airtable metadata, including airtableId, timestamps, and owner.

### 🔄 Airtable Dashboard

[![Airtable](./screenshots/airtable-dashboard.png)](./screenshots/airtable-dashboard.png)
Submitted forms appear in Airtable with title, slug, field count, and creation timestamp.

🙌 Credits
Backend built by Navya Arora for a MERN stack interview task.
Includes Airtable integration, conditional logic validation, and modular API design.

---

```

```
