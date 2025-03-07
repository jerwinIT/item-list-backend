import pool from "../config/db";

// Get All Items
const getItems = async () => {
  const result = await pool.query("SELECT * FROM items ORDER BY id");
  return result.rows;
};

// Add Item
const addItem = async (name, description, quantity) => {
  const result = await pool.query(
    "INSERT INTO items (name, description, quantity) VALUES ($1, $2, $3) RETURNING *",
    [name, description, quantity]
  );
  return result.rows[0];
};

// Update Item
const updateItem = async (id, name, description, quantity) => {
  const result = await pool.query(
    "UPDATE items SET name=$1, description=$2, quantity=$3, WHERE id=$4 RETURNING *",
    [name, description, quantity, id]
  );
  return result.rows[0];
};

// Delete Item
const deleteItem = async (id) => {
  await pool.query("DELETE FROM items WHERE id=$1", [id]);
};

module.exports = { getItems, addItem, updateItem, deleteItem };
