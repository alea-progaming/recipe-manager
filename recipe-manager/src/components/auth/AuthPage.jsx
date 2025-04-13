import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center h-screen font-itim">
      <div className="flex flex-col items-center mb-6">
        <img src="" alt="" /> {/* Web app logo display*/}
        <h1 className="text-3xl">Eggs</h1>
      </div>
      <div className="flex flex-col min-w-md border-2 border-black rounded-[10px] bg-white">
        <div className="w-full p-3 flex flex-col justify-center">
          <div className="relative flex items-center text-2xl ">
            <button
              className={`cursor-pointer mr-2 ${
                showLogin ? "font-medium" : "font-light"
              }`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            {/* <p className="text-3xl font-light">|</p> */}
            <span className="bg-black h-6 w-[1px] mr-2" />
            <button
              className="cursor-pointer mr-2"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </button>

            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 -mb-1 bg-[#FFC471] transition-transform duration-300 ${
                showLogin ? "translate-x-0" : "translate-x-18"
              }`}
            />
          </div>
          {/* <hr className="relative bottom-3 w-5" /> */}
          <div className="inline-block self-center p-3">
            {showLogin ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
