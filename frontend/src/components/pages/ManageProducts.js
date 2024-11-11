import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    text: "",
    src: "",
    label: "",
    alt: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8081/items");
      console.log("Fetched items:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8081/items", newItem);
      setNewItem({ text: "", src: "", label: "", alt: "" });
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      text: item.text,
      src: item.src,
      label: item.label,
      alt: item.alt,
    });
  };

  const handleSaveItem = async () => {
    if (editingItem) {
      try {
        console.log("Updating item with ID:", editingItem.id);
        console.log("Data being sent:", newItem); // Log data being sent
        await axios.put(
          `http://localhost:8081/items/${editingItem.id}`,
          newItem
        );
        setEditingItem(null);
        setNewItem({ text: "", src: "", label: "", alt: "" });
        fetchItems();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>
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
        placeholder="Label"
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
            />{" "}
            {/* Display image */}
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
