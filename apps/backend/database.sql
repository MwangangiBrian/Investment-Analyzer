CREATE DATABASE IF NOT EXISTS `investment-analyzer` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `users`(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN
)