import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ingredients from "./crud/Ingredients";
import Procedures from "./crud/Procedures";
import { toast } from "react-toastify";
// Current loggin-in user imports
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [recipeTimer, setRecipeTimer] = useState("");
  const [recipeServings, setRecipeServings] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !recipeName ||
      !recipeDesc ||
      !recipeType ||
      !recipeTimer ||
      !recipeServings ||
      !ingredients ||
      !procedures
    ) {
      alert("Please fill in all fields");
      return;
    }

    const recipeData = {
      name: recipeName,
      description: recipeDesc,
      type: recipeType,
      timer: parseInt(recipeTimer),
      servings: parseInt(recipeServings),
      ingredients,
      procedures,
      user: auth.currentUser?.uid,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "Recipes"), recipeData);
      alert("Recipe saved!");

      setRecipeName("");
      setRecipeDesc("");
      setRecipeType("");
      setRecipeTimer("");
      setRecipeServings("");
      setIngredients([]);
      setProcedures([]);

      navigate("/dashboard");
    } catch (error) {
      toast.success(error.message, { position: "bottom-center" });
    }
  };
  return (
    <>
      <div className="max-w-10/12 mx-auto">
        <h3>New Recipe Form</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start border"
        >
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="border rounded"
          />
          <label htmlFor="recipeDesc">Description</label>
          <textarea
            id="recipeDesc"
            value={recipeDesc}
            onChange={(e) => setRecipeDesc(e.target.value)}
            className="border border-black rounded"
          ></textarea>
          <label htmlFor="recipeType">Type</label>
          {/* Radio buttons */}
          <div className="pl-4 grid grid-cols-2 gap-2 border">
            {[
              { label: "Breakfast", name: "breakfast" },
              { label: "Lunch", name: "lunch" },
              { label: "Dinner", name: "dinner" },
              { label: "Snack", name: "snack" },
            ].map(({ label, name }, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="type"
                  id={name}
                  value={name}
                  checked={recipeType === name}
                  onChange={(e) => setRecipeType(e.target.value)}
                />
                <label htmlFor={name}>{label}</label>
              </div>
            ))}
          </div>
          <div className="flex gap-10">
            {/* Timer */}
            <div>
              <label htmlFor="recipeTimer">Timer</label>
              <div>
                <input
                  id="recipeTimer"
                  type="number"
                  value={recipeTimer}
                  onChange={(e) => setRecipeTimer(e.target.value)}
                  className="border w-10"
                />
                <span>minutes</span>
              </div>
            </div>
            {/* Servings */}
            <div>
              <label htmlFor="recipeServings">No. of Servings</label>
              <div>
                <input
                  id="recipeServings"
                  type="number"
                  value={recipeServings}
                  onChange={(e) => setRecipeServings(e.target.value)}
                  className="border w-10"
                />
                <span>servings</span>
              </div>
            </div>
          </div>
          <Ingredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Procedures procedures={procedures} setProcedures={setProcedures} />

          <input type="submit" value="Apply & Save" />
          <button>Delete</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
