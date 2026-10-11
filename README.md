# 📚 BookNest – Online Book Store

BookNest is a Django-based online book store project designed to provide a simple and user-friendly platform for browsing books and managing a shopping cart.

## ✨ Features

* 🏠 Home page with a book store interface
* 📖 Browse available books
* 🛒 Add books to a shopping cart
* 💾 Store cart items using browser local storage
* 💳 Demo checkout interaction
* 🎨 Responsive frontend styling
* ⚙️ Django-based backend

## 🛠️ Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python, Django
* **Environment variables:** python-dotenv
* **Version control:** Git and GitHub

## 📁 Project Structure

```text
online_book_store/
├── config/
├── store/
├── templates/
│   └── home.html
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/subashsri-balakrishnan/Online_Book_Store.git
cd Online_Book_Store
```

### 2. Create and activate a virtual environment

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```text
DJANGO_SECRET_KEY=your-new-secret-key
```

Replace the placeholder with a newly generated Django secret key. Never upload `.env` to GitHub.

### 5. Run database migrations

```powershell
python manage.py migrate
```

### 6. Start the development server

```powershell
python manage.py runserver
```

Open http://127.0.0.1:8000/ in your browser.

## 🔐 Security Note

* Keep secret keys in environment variables.
* Do not commit `.env` files or other sensitive credentials.
* `DEBUG = True` is intended for local development only.

## 📌 Project Status

This project is a learning and development project. The cart and checkout interactions are demonstrations; a production-ready payment gateway and persistent order-management system are not included.

## 👩‍💻 Author

**Subashsri Balakrishnan**

GitHub: [subashsri-balakrishnan](https://github.com/subashsri-balakrishnan)
