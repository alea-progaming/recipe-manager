import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [userDeets, setUserDeets] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDeets(docSnap.data());
        console.log(docSnap);
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User log out succesfully");
    } catch (error) {
      console.log("Error logging out: ", error.message);
    }
  }
  return (
    <>
      {userDeets ? (
        <>
          <h3>
            Welcome to you dashboard, {userDeets.firstName} {userDeets.lastName}
          </h3>
          <button
            className="border-b-black cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};
export default Dashboard;
