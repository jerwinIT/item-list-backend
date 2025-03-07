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
                const response = await fetch("http://localhost:3000/api/items");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result.slice(0, 12));
                console.log(result);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    const handleAddTask = async () => {
        const newTitle = prompt("Enter task title:");
        const newBody = prompt("Enter task description:");

        if (newTitle && newBody) {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle, body: newBody, userId: 1 }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add task");
                }

                const newTask = await response.json();
                setData([...data, { ...newTask, id: data.length + 1 }]); // Fake an ID for UI
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            setData(data.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpdate = async (id) => {
        const newTitle = prompt("Enter new title:");
        const newBody = prompt("Enter new body:");

        if (newTitle && newBody) {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: newTitle, body: newBody, userId: 1 }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update post");
                }

                const updatedPost = await response.json();
                setData(data.map(post =>
                    post.id === id ? { ...post, title: updatedPost.title, body: updatedPost.body } : post
                ));
            } catch (error) {
                console.error("Error updating post:", error);
            }
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar onAdd={handleAddTask} />
            <div className="container mt-3 d-flex flex-wrap gap-2 justify-content-center">
                {data.map((post) => (
                    <Card key={post.id} id={post.id} title={post.title} body={post.body} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
            </div>
        </>
    );
}

export { Clock, GetData };
