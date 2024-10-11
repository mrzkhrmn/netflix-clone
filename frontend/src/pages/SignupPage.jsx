import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { useState } from "react";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const loading = false;
  return (
    <div className="hero-bg h-screen w-full">
      <header className=" max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to={"/"}>
          <img src="./netflix-logo.png" alt="netflix logo" className="w-52" />
        </Link>
      </header>

      <div className="mt-20 mx-3 flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label={"Email"}
              value={formData.email}
              type={"email"}
              id={"email"}
              placeholder={"you@example.com"}
              onChange={(e) => handleChange(e)}
            />
            <Input
              label={"Username"}
              value={formData.username}
              type={"text"}
              id={"username"}
              placeholder={"username..."}
              onChange={(e) => handleChange(e)}
            />
            <Input
              label={"Password"}
              value={formData.password}
              type={"password"}
              id={"password"}
              placeholder={"password..."}
              onChange={(e) => handleChange(e)}
            />
            <button
              disabled={loading}
              className="text-white bg-red-600 hover:bg-red-700 transition duration-200 w-full text-center rounded-md py-2 text-lg"
            >
              {loading ? "Logging In..." : "Sign In"}
            </button>
          </form>
          <p className="text-white text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Log in now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
