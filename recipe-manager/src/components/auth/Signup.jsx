import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Create new user in firebase auth using email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // grabs the currently signed-in user (i.e. who just registered)
      const user = auth.currentUser;

      // print user object, usefull for debugging
      console.log(user);

      // checks if user was actually created
      if (user) {
        // add new user's info to firestore
        // db=instance from firebase.js
        // setDoc(...)=write user data (email, firstname, lastname) to the doc
        // doc(db, "Users", user.uid)=creates a reference to Users/{uid}
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
        toast.success("User Registered Successfully", {
          position: "top-center",
        });
      }
      console.log("User registered successfully");
    } catch (error) {
      toast.success(error.message, {
        position: "bottom-center",
      });
      console.log(error.message);
    }
  };
  return (
    <>
      {/* Signup Form */}
      <form onSubmit={handleRegister}>
        {/* Full Name */}
        <label htmlFor="firstName" className="text-lg">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          onChange={(e) => setFname(e.target.value)}
          placeholder="John"
          className="block border border-b-black mb-2 w-72 p-1 rounded"
          required
        />

        <label htmlFor="lastName" className="text-lg">
          {" "}
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          onChange={(e) => setLname(e.target.value)}
          placeholder="Doe"
          className="block border border-b-black mb-2 w-72 p-1 rounded"
          required
        />

        {/* email */}
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. a@co"
          className="block border border-b-black mb-2 w-72 p-1 rounded"
          required
        />

        {/* Password */}
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="block border border-b-black mb-7 w-72 p-1 rounded"
          required
        />
        <input
          type="submit"
          value="Signup"
          className="block bg-[#FFC471] px-5 py-1 mx-auto rounded cursor-pointer"
        />
        {/* <p className="forgot-password">
          Already registered{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p> */}
      </form>
    </>
  );
};
export default Signup;
