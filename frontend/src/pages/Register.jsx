import React, { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password tidak sama");
      return;
    }

    const data = {
      nama: nama,
      email: email,
      password: password,
    };

    try {
      const res = await registerUser(data);
      console.log(res);
      alert("berhasil register");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-[500px] min-h-screen max-w-[500px] mx-auto p-10">
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
      <button class="btn btn-accent" onClick={handleRegister}>
        Accent
      </button>
    </div>
  );
};

export default Register;
