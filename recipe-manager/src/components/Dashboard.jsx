import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore"; // grab firebase functions
import { toast } from "react-toastify";
import createButton from "../assets/create-recipe.svg";
const Dashboard = () => {
  const [userDeets, setUserDeets] = useState(null);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribeFetchUserData = auth.onAuthStateChanged(async (user) => {
      // firebase listener to check if a user is logged in
      // console.log(user);

      const docRef = doc(db, "Users", user.uid); // create firestore document reference to Users/{uid}
      const docSnap = await getDoc(docRef); // actually fetch that documents from firestore
      if (docSnap.exists()) {
        // setting the user data from docSnap [which is the fetched data from firestore]
        setUserDeets(docSnap.data());

        const recipesRef = collection(db, "Recipes");
        const q = query(recipesRef, where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecipes(userRecipes);

        console.log(docSnap);
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribeFetchUserData();
  }, []);

  // function to log out user
  async function handleLogout() {
    try {
      await auth.signOut(); // firestore function to sign out
      navigate("/");
      console.log("User log out succesfully");
    } catch (error) {
      console.log("Error logging out: ", error.message);
    }
  }
  return (
    <>
      {userDeets ? (
        <>
          {/*  watch tutorial about tailwind css responsive again */}
          <div className="max-w-10/12 mx-auto">
            <h1>Eggs</h1>
            <div className="flex justify-between">
              <h3>
                Welcome to your dashboard, <br></br>{" "}
                <span className="font-bold">
                  {userDeets.firstName} {userDeets.lastName} !
                </span>
              </h3>
              <button
                className="border-b-black cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
            {/* Main Content */}
            <div className="border border-amber-500">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl">Your recipes</h2>
                {/*navigate to create recipe form when finished*/}
                <span className="w-6 h-6 text-amber-950">
                  <a href="/createRecipe">
                    <img src={createButton} alt="" />
                  </a>
                </span>
              </div>

              {/* Recipes */}
              <div>
                {/* Individual recipe container */}
                {/* <div className="border border-black mb-5">
                  <h4>Chocolate Chip Banana Bread</h4>
                  <p>
                    First time baking. My favorite part is the smell that
                    surrounds my kitchen when it’s baking.
                  </p>
                  <div className="tags">
                    <span>
                      <svg className="hidden" />
                      75 minutes
                    </span>
                    <span>Breakfast</span>
                  </div>
                </div> */}
                <div>
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="border border-black mb-5 p-4 rounded"
                      >
                        <h4 className="text-xl font-bold">{recipe.name}</h4>
                        <p className="text-gray-700">{recipe.description}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span>{recipe.timer} minutes</span>
                          <span className="capitalize">{recipe.type}</span>
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="italic">
                      No recipes yet. Hit that "+" to create one!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};
export default Dashboard;
