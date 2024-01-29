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

  const loginHandler = async () => {
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
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-[500px] min-h-screen max-w-[500px] mx-auto p-10">
      <Input label="Email" type={"email"} onChange={emailOnChange} value={email} />
      <Input label="Password" type={"password"} onChange={passwordOnChange} value={password} />
      <button class="btn btn-error w-full mt-3" onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
