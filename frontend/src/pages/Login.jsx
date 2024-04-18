import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("cliocke");
    const credential = {
      email: email,
      password: password,
    };
    console.log(credential);
    try {
      const res = await loginUser(credential);
      if (res) {
        alert("login succes");
        if (res.role === "customer") {
          navigate("/");
        } else if (res.role === "vendor") {
          navigate("/vendor");
        }
      }
      console.log(res);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-screen h-screen flex items-center">
      <form
        onSubmit={loginHandler}
        className="flex flex-col gap-3 items-center justify-center border border-black h-[600px] w-[400px] rounded-xl mx-auto p-10"
      >
        <h className="text-3xl font-semibold mb-10">Welcome</h>
        <Input label="Email" type={"email"} onChange={emailOnChange} value={email} />
        <Input label="Password" type={"password"} onChange={passwordOnChange} value={password} />
        <button className="btn btn-error w-full mt-3 text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
