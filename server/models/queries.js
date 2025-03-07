import pool from "../config/db.js";

// Get All Items
const getItems = async () => {
  const result = await pool.query("SELECT * FROM items ORDER BY item_id");
  return result.rows;
};

// Add Item
const addItem = async (item_name, description, quantity) => {
  const result = await pool.query(
    "INSERT INTO items (item_name, description, quantity) VALUES ($1, $2, $3) RETURNING *",
    [item_name, description, quantity]
  );
  return result.rows[0];
};

// Update Item
const updateItem = async (item_id, item_name, description, quantity) => {
  const result = await pool.query(
    "UPDATE items SET item_name=$1, description=$2, quantity=$3 WHERE item_id=$4 RETURNING *",
    [item_name, description, quantity, item_id]
  );
  return result.rows[0];
};

// Delete Item
const deleteItem = async (item_id) => {
  await pool.query("DELETE FROM items WHERE item_id=$1", [item_id]);
};

export { getItems, addItem, updateItem, deleteItem };
