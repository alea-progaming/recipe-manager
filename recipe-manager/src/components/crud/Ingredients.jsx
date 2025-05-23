import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const Ingredients = ({ ingredients, setIngredients }) => {
  const [newIngredientInput, setNewIngredientInput] = useState("")
  const [showInput, setShowInput] = useState(false)

  // Add the input box for adding ingredients
  const handleAdd = () => {
    setShowInput(true)
  }

  // Add the ingredient -> from writing to reseting the input
  const handleNewInputSubmit = () => {
    const trimmed = newIngredientInput.trim()
    if (!trimmed) return

    // an object/instance of ingredients
    const newIngredient = {
      id: uuidv4(), // unique id for ingredient
      text: trimmed, // the actual ingredient content
      isEditing: false, // just shows up normally with Edit/Delete buttons, in short, readOnly
    }

    setIngredients([...ingredients, newIngredient]) // basically [existing ingredients..., new ingredient->object/instance]
    setNewIngredientInput("")
    setShowInput(false)
  }

  // sets the input to editing mode, which is why isEditing is true
  const handleEditToggle = (id) => {
    setIngredients(
      (
        prev // prev means current list of ingredients
      ) =>
        prev.map(
          // map to that list of ingredients
          (
            ingredient // for each -ingredient-
          ) =>
            ingredient.id === id
              ? { ...ingredient, isEditing: true }
              : ingredient // looping through the ingredients array, if id matches ? make editable : leave as is
        )
    )
  }

  // change the ingredient based on user edit input of a certain ingredient based on their id
  const handleEditChange = (id, value) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, text: value } : ingredient
      )
    )
  }

  // save the edited version
  const handleEditDone = (id) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, isEditing: false } : ingredient
      )
    )
  }

  // delete the ingredient
  const handleDelete = (id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id))
  }

  return (
    <div className="flex flex-col w-full">
      <label className="text-[18px] mb-2" htmlFor="">
        Ingredients
      </label>
      {/* Display added ingredients (contents of the ingredient array) */}
      {ingredients.map((ingredient) => (
        // container for editing the ingredient items
        <div
          className="flex items-center p-1 mb-2 rounded bg-white ml-3 border"
          key={ingredient.id}
        >
          {/* whether the input box has to be edited or is just only displaying the ingredient */}
          {ingredient.isEditing ? (
            <input
              type="text"
              value={ingredient.text}
              onChange={(e) => handleEditChange(ingredient.id, e.target.value)}
              autoFocus
              className="flex-grow mr-3 min-w-0 focus:border-transparent focus:outline-none"
            />
          ) : (
            <input
              type="text"
              value={ingredient.text}
              readOnly
              className="flex-grow mr-3 min-w-0 focus:border-transparent focus:outline-none"
            />
          )}

          {/* inside the input box is this container for edit/delete buttons inside editing mode */}
          <div className="flex items-center space-x-2 shrink-0">
            {ingredient.isEditing ? (
              <button
                type="button"
                onClick={() => handleEditDone(ingredient.id)}
                className="text-[#639A6F] underline"
              >
                Done
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleEditToggle(ingredient.id)}
                className="text-[#639A6F] underline"
              >
                Edit
              </button>
            )}

            <button
              className="text-[#E41A1A] underline"
              type="button"
              onClick={() => handleDelete(ingredient.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Show when Add button is pressed */}
      {showInput && (
        <div className="flex items-center p-1 mb-2 rounded bg-white mx-3 border">
          <input
            type="text"
            value={newIngredientInput}
            onChange={(e) => setNewIngredientInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNewInputSubmit()
            }}
            autoFocus
            placeholder="Enter new ingredient"
            className="w-[85%] focus:border-transparent focus:outline-none"
          />
          <button
            className="text-[#639A6F] underline"
            type="button"
            onClick={handleNewInputSubmit}
          >
            Done
          </button>
        </div>
      )}

      {!showInput && (
        <div>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[#E9B452] text-white px-2 py-1 ml-3 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}

export default Ingredients
