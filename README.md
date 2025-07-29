# 🌐 DiscourseHub - Admin Dashboard

This project is a full-featured discussion platform where users can join, post, and comment. The Admin Panel provides advanced moderation and site management tools such as managing users, announcements, reports, and tags.

## 🔐 Authentication (JWT)

- JWT implemented on login (email/password & social login)
- use firebase accessToken and verify tha token
- Private route protection for Dashboard

---

## 🧑‍💼 Admin Dashboard Features

### ✅ Admin Profile Page
- Displays:
  - Admin Name
  - Email
  - Image
  - Total Posts
  - Total Comments
  - Total Users

- 📊 Pie Chart using `Recharts` to visualize:
  - Posts
  - Comments
  - Users

- ➕ Add New Tags:
  - A form allows the admin to add new tags
  - Tags are stored in the `tags` collection in the database
  - These tags appear in the post creation dropdown for users

---

### 👥 Manage Users Page
- List all registered users with:
  - Name, Email, Role (User/Admin)
  - Subscription status (Membership)
  - “Make Admin” button (Role update feature)

- 🔎 Search functionality by name/email
- 📄 Pagination: 10 users per page
- 🗂 Backend filtered API for user data

---

### 📢 Make Announcements
- Admins can publish announcements
- Fields: Author Name, Author Image, Title, Description
- Stored in `announcements` collection
- Visible on the Home Page under "📢 Latest Announcements"

---

### 🚨 Reported Comments/Posts Page
- Admins can view user-reported content
- Actions available:
  - ✅ Approve Post/Comment
  - 🗑️ Delete Content
  - ⚠️ Warn User (Optional Feature)

---

## ⚙️ Technologies Used

- **React.js**
- **React Router**
- **Firebase Authentication**
- **Tailwind CSS + DaisyUI**
- **Recharts** (For Pie Chart)
- **MongoDB + Express.js + Node.js**
- **JWT (jsonwebtoken)** for authentication
- **Axios** with interceptor

---

## 📁 Collections in MongoDB

- `users` – All registered users
- `posts` – User-generated posts
- `comments` – Comments under posts
- `tags` – Admin-defined tags for categorization
- `announcements` – Announcements made by admin
- `reports` – Reported content details

---

