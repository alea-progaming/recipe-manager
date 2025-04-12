import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("User logged in succesfully!");
      window.location.href = "/dashboard";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      // console.log(error.message);
      toast.success(error.message, { position: "bottom-center" });
    }
  };
  return (
    <>
      {/* Login */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. a@co"
          className="block border border-b-black"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="block border border-b-black"
        />
        <input
          type="submit"
          value="Login"
          className="border border-b-black cursor-pointer"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};
export default Login;
