CREATE TABLE IF NOT EXISTS users (
    user_id int auto_increment primary key,
    name varchar(100),
    email varchar(255),
    password_hash varchar(255),
    role varchar(50)
);

INSERT INTO users (name, email, password_hash, role)
VALUES
    ('Alice', 'alice@example.com', 'hashedpassword1', 'ADMIN'),
    ('Bob', 'bob@example.com', 'hashedpassword2', 'USER'),
    ('Charlie', 'charlie@example.com', 'hashedpassword3', 'USER');
