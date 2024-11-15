# MUBU

## Introduction

Welcome to **MUBU**, an online shopping platform designed to provide users with a seamless and enjoyable shopping experience. Our website aims to combine convenience, style, and affordability by offering a wide range of products across various categories, including fashion, lifestyle and more. Whether you’re looking for the latest trends or classic , MUBU has something for everyone.

[MEDIUM POST](https://medium.com/@peredemacron/mubu-105afd02253d)

## Installation

To get started with **MUBU**, follow the steps below to set up the project locally or begin using the website directly.

---

### 1. **Clone the Repository**

First, clone the repository to your local machine:

```
git clone https://github.com/your-username/your-repository-name.git
```

---

### 2. **Install Dependencies**

Navigate into the project folder and install the required dependencies:

For the backend (Node.js):

```
cd backend
npm install
```

For the frontend (React):

```
cd frontend
npm install
```

---

### 3. **Environment Variables**

Create a `.env` file in both the backend and frontend directories to store your environment variables (e.g., API keys, database credentials, etc.). Here’s an example:

**Backend (.env)**:

```
PORT=8081
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=login_sample_db
JWT_SECRET=your_jwt_secret
```

**Frontend (.env)**:

```
REACT_APP_API_URL=http://localhost:8081
```

### 4. **Create DataBase**

'you must need a database, the website will be blank if not a db is connected'

the database table code are:

###### ITEM TABLE:

```

CREATE TABLE `item` (
`id` int unsigned NOT NULL AUTO_INCREMENT,
`text` varchar(255) NOT NULL,
`src` varchar(255) NOT NULL,
`label` varchar(255) NOT NULL,
`alt` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

```

###### USERS TABLE:

```

CREATE TABLE `users` (
`user_id` int NOT NULL AUTO_INCREMENT,
`first_name` varchar(100) DEFAULT NULL,
`last_name` varchar(100) DEFAULT NULL,
`email` varchar(100) DEFAULT NULL,
`password` varchar(255) DEFAULT NULL,
`is_admin` tinyint(1) DEFAULT '0',
PRIMARY KEY (`user_id`),
UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

```

###### CART TABLE:

```

CREATE TABLE `cart` (
`id` int NOT NULL AUTO_INCREMENT,
`user_id` int NOT NULL,
`product_id` int unsigned NOT NULL,
`size` varchar(10) DEFAULT NULL,
`quantity` int DEFAULT '1',
`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
KEY `user_id` (`user_id`),
KEY `product_id` (`product_id`),
CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 38 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

```

### 5. **Run the Application**

#### Frontend:

In the **frontend** directory, start the React development server:

```
npm start
```

## Usage

## Contributing

### Contributors

- **[Gary Mirambet](https://github.com/peredemacron)** - Project Lead - Fullstack Dev

---

## Related projects

Here are some related projects that might be of interest:

- **[Youtube-downloader-website](https://github.com/PereDeMacron/Youtube-downloader-website)**: A solo project to download youtube video from a local website.

## Licensing

This project is licensed under the [MIT License](LICENSE).

See the [LICENSE](LICENSE) file for more details.

---

If you would like to use this project or contribute to it, please refer to the terms outlined in the license above.
