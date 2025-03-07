import { useState, useEffect } from "react";
import { Navbar, Card } from "./components";

function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <h5 className="fs-3 text-center">{time}</h5>;
}

function GetData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3005/api/items");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                console.log('Fetched data:', result);
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            }
        }
        fetchData();
    }, []);

    const handleAddTask = async () => {
        const newName = prompt("Enter item name:");
        const newDescription = prompt("Enter item description:");
        const newQuantity = parseInt(prompt("Enter quantity:"));

        if (newName && newDescription && newQuantity) {
            try {
                const response = await fetch("http://localhost:3005/api/items", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        item_name: newName, 
                        description: newDescription, 
                        quantity: newQuantity 
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add item");
                }

                const newItem = await response.json();
                setData([...data, newItem]);
            } catch (error) {
                console.error("Error adding item:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3005/api/items/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setData(data.filter(item => item.item_id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleUpdate = async (id) => {
        const newName = prompt("Enter new name:");
        const newDescription = prompt("Enter new description:");
        const newQuantity = parseInt(prompt("Enter new quantity:"));

        if (newName && newDescription && newQuantity) {
            try {
                const response = await fetch(`http://localhost:3005/api/items/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        item_name: newName, 
                        description: newDescription, 
                        quantity: newQuantity 
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update item");
                }

                const updatedItem = await response.json();
                setData(data.map(item =>
                    item.item_id === id ? updatedItem : item
                ));
            } catch (error) {
                console.error("Error updating item:", error);
            }
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar onAdd={handleAddTask} />
            <div className="container mt-3 d-flex flex-wrap gap-2 justify-content-center">
                {data.map((item) => (
                    <Card 
                        key={item.item_id} 
                        id={item.item_id} 
                        title={item.item_name} 
                        body={`Description: ${item.description}, Quantity: ${item.quantity}`} 
                        onDelete={handleDelete} 
                        onUpdate={handleUpdate} 
                    />
                ))}
            </div>
        </>
    );
}

export { Clock, GetData };
