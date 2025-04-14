import React, { useState } from "react";

const Create = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;

    if (editIndex !== null) {
      const updated = [...ingredients];
      updated[editIndex] = ingredientInput;
      setIngredients(updated);
      setEditIndex(null);
    } else {
      setIngredients([...ingredients, ingredientInput]);
    }

    setIngredientInput("");
  };

  const handleEdit = (index) => {
    setIngredientInput(ingredients[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
    // if deleting the one being edited, reset edit
    if (index === editIndex) {
      setEditIndex(null);
      setIngredientInput("");
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="">Ingredients</label>
      <input type="text" className="border" />
      {/* Make edit and delete button */}
      <button className="self-end">Add</button> {/*To add ingredients */}
    </div>
  );
};

export default Create;
