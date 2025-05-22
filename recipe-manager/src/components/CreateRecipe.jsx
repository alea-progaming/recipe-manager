import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Ingredients from "./crud/Ingredients"
import Procedures from "./crud/Procedures"
import { toast } from "react-toastify"
// Current loggin-in user imports
import { auth, db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

const CreateRecipe = () => {
  const navigate = useNavigate()
  const [recipeName, setRecipeName] = useState("")
  const [recipeDesc, setRecipeDesc] = useState("")
  const [recipeType, setRecipeType] = useState("")
  const [recipeTimer, setRecipeTimer] = useState("")
  const [recipeServings, setRecipeServings] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [procedures, setProcedures] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !recipeName ||
      !recipeDesc ||
      !recipeType ||
      !recipeTimer ||
      !recipeServings ||
      !ingredients ||
      !procedures
    ) {
      alert("Please fill in all fields")
      return
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
    }

    try {
      await addDoc(collection(db, "Recipes"), recipeData)
      // alert("Recipe saved!")

      setRecipeName("")
      setRecipeDesc("")
      setRecipeType("")
      setRecipeTimer("")
      setRecipeServings("")
      setIngredients([])
      setProcedures([])

      navigate("/dashboard")
    } catch (error) {
      toast.success(error.message, { position: "bottom-center" })
    }
  }

  const maxDescChar = 150
  return (
    <>
      <div className="max-w-10/12 mx-auto m-3.5 font-itim">
        <h3 className="text-4xl mb-3.5">New Recipe Form</h3>
        <div className="pl-3.5">
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <label className="text-[18px]" htmlFor="recipeName">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="w-full h-9 p-1 mb-3 border-2 rounded bg-white"
            />
            <label className="text-[18px]" htmlFor="recipeDesc">
              Description
            </label>
            <textarea
              id="recipeDesc"
              value={recipeDesc}
              rows="4"
              onChange={(e) => {
                if (e.target.value.length <= maxDescChar) {
                  setRecipeDesc(e.target.value)
                }
              }}
              className="w-full p-1 mb-3 border-2 rounded bg-white"
            ></textarea>
            <p
              className={`w-full text-right ${
                recipeDesc.length >= maxDescChar ? "text-red-600" : ""
              }`}
            >
              {recipeDesc.length}/{maxDescChar}
            </p>
            <label className="text-[18px]" htmlFor="recipeType">
              Type
            </label>
            {/* Radio buttons */}
            <div className="pl-4 m-4 grid grid-cols-2 gap-y-7 w-full">
              {[
                { label: "Breakfast", name: "breakfast" },
                { label: "Lunch", name: "lunch" },
                { label: "Dinner", name: "dinner" },
                { label: "Snack", name: "snack" },
              ].map(({ label, name }, index) => (
                <div key={index} className="text-[18px]">
                  <input
                    type="radio"
                    name="type"
                    id={name}
                    value={name}
                    checked={recipeType === name}
                    onChange={(e) => setRecipeType(e.target.value)}
                    className="w-4 h-4 "
                  />
                  <label className="ml-3" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex px-4 mb-3 gap-10 w-full">
              {/* Timer */}
              <div>
                <label className="text-[18px]" htmlFor="recipeTimer">
                  Timer
                </label>
                <div className="mt-1">
                  <input
                    id="recipeTimer"
                    type="number"
                    value={recipeTimer}
                    onChange={(e) => setRecipeTimer(e.target.value)}
                    className="border bg-white p-1 w-10 mr-2 rounded"
                  />
                  <span>minutes</span>
                </div>
              </div>
              {/* Servings */}
              <div>
                <label className="text-[18px]" htmlFor="recipeServings">
                  No. of Servings
                </label>
                <div className="mt-1">
                  <input
                    id="recipeServings"
                    type="number"
                    value={recipeServings}
                    onChange={(e) => setRecipeServings(e.target.value)}
                    className="border bg-white p-1 w-10 mr-2 rounded"
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
            <div className="flex flex-col self-center mt-14">
              <input
                type="submit"
                value="Apply & Save"
                className="bg-[#FFAF40] text-white cursor-pointer rounded px-2 py-1 mb-3 self-center"
              />
              <button className="bg-[#9E9E9E] text-white rounded cursor-pointer px-2 py-1 self-center">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateRecipe
