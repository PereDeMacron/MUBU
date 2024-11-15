# MUBU

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

## Introduction

[MEDIUM POST](https://medium.com/@peredemacron/mubu-105afd02253d)

## Installation

#### RUN THE APP

to install all requirement run in the project folder `npm install`

after install the requirement to run the website in frontend folder run `npm start`

#### DATABASE

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

after creating the table the website will perfectly work

## Usage

## Contributing

## Related projects

## Licensing
