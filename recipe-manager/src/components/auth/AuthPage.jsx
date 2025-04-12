import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen font-itim">
      <div className="flex flex-col w-[80%] m-5 p-5 items-center justify-center border border-black">
        <img src="" alt="" />
        <h1 className="text-3xl">Eggs</h1>
        <div className="">
          <div className="border border-amber-700">
            {/* <h3 className="font-bold mb-5">Login | Signup</h3> */}

            <div className="flex">
              <button
                className="cursor-pointer"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <p className="text-5xl">|</p>
              <button
                className="cursor-pointer"
                onClick={() => setShowLogin(false)}
              >
                Signup
              </button>
            </div>
            {/* <hr className="relative bottom-3 w-5" /> */}
          </div>
          {showLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
