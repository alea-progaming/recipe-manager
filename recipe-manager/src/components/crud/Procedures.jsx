import { useState } from "react";
import { v4 as uuid } from "uuid";
import Ingredients from "./Ingredients";

const Procedures = () => {
  const [showInput, setShowInput] = useState(false); // to show input box
  const [procedures, setProcedures] = useState([]); // store procedures here
  const [newProcedureInput, setNewProcedureInput] = useState(""); // the procedure

  // onClick: show input after clicking Add
  const handleAddProcedure = () => {
    setShowInput(true);
  };

  // onClick: click to add change
  const handleNewInputSubmit = (e) => {
    const newProcedure = {
      id: uuid(),
      text: newProcedureInput.trim(),
      isEditing: false,
    };

    setProcedures([...procedures, newProcedure]); // add the procedure to the array of procedures
    setNewProcedureInput("");
    setShowInput(false);
  };

  // onChange: this is where the handleNewInput will reflects its values
  const handleValueChange = (id, value) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, text: value } : procedure
      )
    );
  };
  // onClick: to turn on editing mode
  const handleEditActivate = (id) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, isEditing: true } : procedure
      )
    );
  };

  const handleEditDone = (id) => {
    setProcedures((prev) =>
      prev.map((procedure) =>
        procedure.id === id ? { ...procedure, isEditing: false } : procedure
      )
    );
  };

  const handleValueDelete = (id) => {
    setProcedures((prev) => prev.filter((procedure) => procedure.id !== id));
  };

  return (
    <div>
      <label htmlFor="">Procedures</label>
      {/* Show procedures here */}
      <ol>
        {procedures.map((procedure) => (
          <li key={procedure.id}>
            {procedure.isEditing ? (
              <input
                value={procedure.text}
                onChange={(e) =>
                  handleValueChange(procedure.id, e.target.value)
                }
              />
            ) : (
              <input value={procedure.text} readOnly />
            )}

            {/* Edit mode ON */}
            <div className="inline">
              {procedure.isEditing ? (
                <button
                  type="button"
                  onClick={() => handleEditDone(procedure.id)}
                >
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEditActivate(procedure.id)}
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                onClick={() => handleValueDelete(procedure.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* Container input when Add button is pressed */}
      {showInput && (
        <div>
          <input
            type="text"
            placeholder="Enter new procedure"
            value={newProcedureInput}
            onChange={(e) => setNewProcedureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNewInputSubmit();
            }}
            autoFocus
          />
          <button type="button" onClick={handleNewInputSubmit}>
            Done
          </button>
        </div>
      )}

      {/* Div for adding procedure button */}
      {!showInput && (
        <div>
          <button type="button" onClick={handleAddProcedure}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};
export default Procedures;
