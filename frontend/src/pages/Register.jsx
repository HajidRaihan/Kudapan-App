import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";
import ButtonSubmit from "../components/ButtonSubmit";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error("password tidak sama");
      setIsLoading(false);
      return;
    }

    const data = {
      nama: nama,
      email: email,
      password: password,
      role: "customer",
    };

    try {
      const res = await registerUser(data);
      console.log(res);
      setNama("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);

      // alert("berhasil register");
      toast.success("berhasil register");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Register");
      setIsLoading(false);

      throw error;
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center">
        <Toaster />
        <form
          // onSubmit={handleRegister}
          className="flex flex-col gap-4 items-center justify-center md:shadow-xl drop-shadow-md md:border border-slate-500 h-[550px] w-[400px] rounded-xl mx-auto p-10"
        >
          <h className="text-4xl font-semibold mb-10 text-primary">Sign Up</h>
          {/* <Input label="Email" type={"email"} onChange={emailOnChange} value={email} /> */}
          {/* <Input label="Password" type={"password"} onChange={passwordOnChange} value={password} /> */}
          <label class="input input-bordered flex items-center gap-2 w-full rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              class="grow"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </label>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {/* <button className="btn btn-error w-full mt-3 text-white rounded-2xl">Sign Up</button> */}
          <ButtonSubmit title="Sign Up" handler={handleRegister} isLoading={isLoading} />
          <p className="text-xs">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>
      {/* <div className="flex flex-col gap-3 items-center justify-center h-[500px] min-h-screen max-w-[500px] mx-auto p-10">
        <div className="w-full">
          <div className="label">
            <span className="label-text">Nama Lengkap</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="label">
            <span className="label-text">Konfirmasi Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn bg-primary text-white w-full" onClick={handleRegister}>
          Register
        </button>
      </div> */}
    </>
  );
};

export default Register;
