import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore"; // grab firebase functions
import { toast } from "react-toastify";
const Dashboard = () => {
  const [userDeets, setUserDeets] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeFetchUserData = auth.onAuthStateChanged(async (user) => {
      // firebase listener to check if a user is logged in
      // console.log(user);

      const docRef = doc(db, "Users", user.uid); // create firestore document reference to Users/{uid}
      const docSnap = await getDoc(docRef); // actually fetch that documents from firestore
      if (docSnap.exists()) {
        // setting the user data from docSnap [which is the fetched data from firestore]
        setUserDeets(docSnap.data());

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
          <div className="">
            <h1>Eggs</h1>
            <div className="flex justify-between">
              <h3>
                Welcome to your dashboard, <br></br> {userDeets.firstName}{" "}
                {userDeets.lastName} !
              </h3>
              <button
                className="border-b-black cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
            {/* Recipes */}
            <div>
              {/* Individual recipe container */}
              <div className="border border-black mb-5">
                {/* Recipe image */}
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
