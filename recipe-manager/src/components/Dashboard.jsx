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
          <div className="max-w-10/12 mx-auto font-ubuntu">
            <h1 className="text-4xl mb-3.5">Eggs</h1>
            <div className="flex justify-between">
              <h3 className="text-[18px]">
                Welcome to your dashboard, <br></br>{" "}
                <span className="font-bold">
                  {userDeets.firstName} {userDeets.lastName} !
                </span>
              </h3>
              <button
                className="border-b-black cursor-pointer hover:underline self-start"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
            <hr className="border mt-10" />
            {/* Main Content */}
            <div>
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
              <div className="grid lg:grid-cols-3 gap-5 mt-4">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex flex-col justify-between h-full px-4 py-2 rounded-[8px] bg-white font-ubuntu drop-shadow-[5px_5px_3px_rgba(0,0,0,0.2)]"
                    >
                      <div className="mb-3">
                        <h4 className="text-xl font-bold text-[#593316] underline">
                          {recipe.name}
                        </h4>
                        <p className="text-gray-700">{recipe.description}</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="inline-block bg-[#527DE9] text-white p-2 rounded-[8px]">
                          {recipe.timer} minutes
                        </span>
                        <span className="inline-block capitalize bg-[#E9B452] text-white p-2 rounded-[8px]">
                          {recipe.type}
                        </span>
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
        </>
      ) : (
        <div className="max-w-10/12 mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
