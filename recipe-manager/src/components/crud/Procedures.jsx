import { useState } from "react"
import { v4 as uuid } from "uuid"
import Ingredients from "./Ingredients"

const Procedures = ({ procedures, setProcedures }) => {
  const [showInput, setShowInput] = useState(false) // to show input box
  const [newProcedureInput, setNewProcedureInput] = useState("") // the procedure

  // onClick: show input after clicking Add
  const handleAddProcedure = () => {
    setShowInput(true)
  }

  // onClick: click to add change
  const handleNewInputSubmit = (e) => {
    const trimmed = newProcedureInput.trim()
    if (!trimmed) return

    const newProcedure = {
      id: uuid(),
      text: newProcedureInput.trim(),
      isEditing: false,
    }

    setProcedures([...procedures, newProcedure]) // add the procedure to the array of procedures
    setNewProcedureInput("")
    setShowInput(false)
  }

  // onChange: this is where the handleNewInput will reflects its values
  const handleValueChange = (id, value) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, text: value } : procedure
      )
    )
  }
  // onClick: to turn on editing mode
  const handleEditActivate = (id) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, isEditing: true } : procedure
      )
    )
  }

  const handleEditDone = (id) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, isEditing: false } : procedure
      )
    )
  }

  const handleValueDelete = (id) => {
    setProcedures((prev) => prev.filter((procedure) => procedure.id !== id))
  }

  return (
    <div className="flex flex-col w-full">
      <label className="text-[18px] mb-2" htmlFor="">
        Procedures
      </label>
      {/* Show procedures here */}
      {procedures.map((procedure) => (
        <div
          key={procedure.id}
          className="flex items-center p-1 mb-2 rounded bg-white ml-3 border"
        >
          {procedure.isEditing ? (
            <input
              value={procedure.text}
              onChange={(e) => handleValueChange(procedure.id, e.target.value)}
              className="flex-grow mr-3 min-w-0 focus:border-transparent focus:outline-none"
            />
          ) : (
            <input
              value={procedure.text}
              readOnly
              className="flex-grow mr-3 min-w-0 focus:border-transparent focus:outline-none"
            />
          )}

          {/* Edit mode ON */}
          <div className="flex items-center space-x-2 shrink-0">
            {procedure.isEditing ? (
              <button
                type="button"
                onClick={() => handleEditDone(procedure.id)}
                className="text-[#639A6F] underline"
              >
                Done
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleEditActivate(procedure.id)}
                className="text-[#639A6F] underline"
              >
                Edit
              </button>
            )}

            <button
              type="button"
              onClick={() => handleValueDelete(procedure.id)}
              className="text-[#E41A1A] underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Container input when Add button is pressed */}
      {showInput && (
        <div className="flex items-center p-1 mb-2 rounded bg-white mx-3 border">
          <input
            type="text"
            placeholder="Enter new procedure"
            value={newProcedureInput}
            onChange={(e) => setNewProcedureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNewInputSubmit()
            }}
            autoFocus
            className="w-[85%] focus:border-transparent focus:outline-none"
          />
          <button
            type="button"
            onClick={handleNewInputSubmit}
            className="text-[#639A6F] underline"
          >
            Done
          </button>
        </div>
      )}

      {/* Div for adding procedure button */}
      {!showInput && (
        <div>
          <button
            type="button"
            onClick={handleAddProcedure}
            className="bg-[#E9B452] text-white px-2 py-1 ml-3 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}
export default Procedures
