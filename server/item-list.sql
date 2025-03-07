CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 1
);

-- data
INSERT INTO items (item_name, description, quantity) VALUES 
('Laptop', 'A high-performance laptop', 10),
('Mouse', 'Wireless mouse', 20),
('Keyboard', 'Mechanical keyboard', 15),
('Monitor', '24-inch LED monitor', 5),
('Headphones', 'Noise-cancelling headphones', 12);