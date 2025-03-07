create table items(
item_id primary key,
item_name varchar(255) not null,
description text,
quantity INT not null default 1
)

-- data
INSERT INTO items (name, description, quantity) VALUES 
('Laptop', 'A high-performance laptop', 10),
('Mouse', 'Wireless mouse', 20),
('Keyboard', 'Mechanical keyboard', 15),
('Monitor', '24-inch LED monitor', 5),
('Headphones', 'Noise-cancelling headphones', 12);