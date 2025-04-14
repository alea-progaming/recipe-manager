import React from "react";
import Create from "./crud/Create";

const CreateRecipe = () => {
  return (
    <>
      <div className="max-w-10/12 mx-auto">
        <h3>New Recipe Form</h3>
        <form action="" className="flex flex-col items-start border">
          <label htmlFor="">Recipe Name</label>
          <input type="text" className="border rounded" />
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
            className="border border-black rounded"
          ></textarea>
          <label htmlFor="type">Type</label>
          {/* Radio buttons */}
          <div className="pl-4 grid grid-cols-2 gap-2 border">
            {[
              { label: "Breakfast", name: "breakfast" },
              { label: "Lunch", name: "lunch" },
              { label: "Dinner", name: "dinner" },
              { label: "Snack", name: "snack" },
            ].map(({ label, name }, index) => (
              <div>
                <input type="radio" name="type" id={name} value={label} />
                <label htmlFor={name}>{label}</label>
              </div>
            ))}
          </div>
          <div className="flex gap-8">
            {[
              { label: "Timer", unit: "minutes" },
              { label: "No. of servings", unit: "serving" },
            ].map(({ label, unit }, index) => (
              <div key={index} className="flex flex-col">
                <label htmlFor="">{label}</label>
                <div className="flex flex-col items-center">
                  <input type="number" className="border w-10" />
                  <span>{unit}</span>
                </div>
              </div>
            ))}
          </div>
          <Create />
          <label htmlFor="">Procedures</label>
          <input type="text" className="border" />
          {/* Make edit and delete button */}
          <button>Add</button> {/*To add procedures */}
          {/* Buttons to apply and save */}
          <button>Apply & Save</button>
          <button>Delete</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
