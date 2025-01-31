import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import ButtonSubmit from "../components/ButtonSubmit";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credential = {
      email: email,
      password: password,
    };

    try {
      console.log(credential);
      const res = await loginUser(credential);
      if (res) {
        toast.success("Login Success");
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center">
      <Toaster />
      <form className="flex flex-col gap-5 items-center justify-center md:shadow-xl drop-shadow-md md:border border-gray-500 h-[500px] w-[400px] rounded-xl mx-auto p-10">
        <h className="text-4xl font-semibold mb-10 text-primary">Login</h>
        {/* <Input label="Email" type={"email"} onChange={emailOnChange} value={email} /> */}
        {/* <Input label="Password" type={"password"} onChange={passwordOnChange} value={password} /> */}

        <label className="input input-bordered flex items-center gap-2 w-full rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            onChange={emailOnChange}
            value={email}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={passwordOnChange}
            value={password}
          />
        </label>
        {/* <button className="btn btn-error w-full mt-3 text-white rounded-2xl">Login</button> */}
        <ButtonSubmit title={"Login"} handler={loginHandler} isLoading={isLoading} />
        <p className="text-xs">
          Don't have account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>

        <p className="text-xs">
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login/vendor")}>
            Sign in as a vendor
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
