import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
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
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // from firebase.js, accessing the email and password from firebase
      console.log(user);
      if (user) {
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
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={(e) => setFname(e.target.value)}
          placeholder="John"
          className="block border border-b-black"
          required
        />

        <label htmlFor="lastName"> Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={(e) => setLname(e.target.value)}
          placeholder="Doe"
          className="block border border-b-black"
          required
        />

        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. a@co"
          className="block border border-b-black"
          required
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="block border border-b-black"
          required
        />
        <input
          type="submit"
          value="Signup"
          className="border border-b-black cursor-pointer"
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
