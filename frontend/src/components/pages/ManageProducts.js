// Import section
import React, { useEffect, useState } from "react";
import axios from "axios";

// Component for managing products
const ManageProducts = () => {
  // State for items and form inputs
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    text: "",
    src: "",
    label: "",
    alt: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from the server
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8081/items");
      if (response.status === 200) {
        setItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("There was an error fetching the items.");
    }
  };

  // Add a new item
  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8081/items", newItem);
      setNewItem({ text: "", src: "", label: "", alt: "" });
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Prepare an item for editing
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      text: item.text,
      src: item.src,
      label: item.label,
      alt: item.alt,
    });
  };

  // Save edited item
  const handleSaveItem = async () => {
    if (editingItem) {
      try {
        await axios.put(
          `http://localhost:8081/items/${editingItem.id}`,
          newItem
        );
        setEditingItem(null);
        setNewItem({ text: "", src: "", label: "", alt: "" });
        fetchItems();
      } catch (error) {
        console.error("Error updating item:", error);
        alert("There was an error updating the item.");
      }
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/items/${id}`);
      console.log(response.data.message);
      fetchItems();
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>

      {/* Form for adding/editing items */}
      <input
        type="text"
        placeholder="Text"
        value={newItem.text}
        onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
      />
      <input
        type="text"
        placeholder="Source (Image URL)"
        value={newItem.src}
        onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
      />
      <input
        type="text"
        placeholder="Label (Price)"
        value={newItem.label}
        onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
      />
      <input
        type="text"
        placeholder="Alt Text"
        value={newItem.alt}
        onChange={(e) => setNewItem({ ...newItem, alt: e.target.value })}
      />
      <button onClick={editingItem ? handleSaveItem : handleAddItem}>
        {editingItem ? "Save Item" : "Add Item"}
      </button>

      {/* List of items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>
              ID: {item.id} - {item.text} - {item.label}
            </span>
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: "100px", height: "auto", marginLeft: "10px" }}
            />
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts; // Exporting the ManageProducts component to be used in App.js
