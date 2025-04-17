import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // auth=firebase auth instance, imported from firebase.js
      // email/password= credentials from the user
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to Dashboard (which I setup for each users)
      window.location.href = "/dashboard";

      // toast alert
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
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="block border border-b-black mb-7 w-72 p-1 rounded"
        />
        <input
          type="submit"
          value="Login"
          className="block bg-[#FFC471] px-5 py-1 mx-auto rounded cursor-pointer"
        />
      </form>
    </>
  );
};
export default Login;
