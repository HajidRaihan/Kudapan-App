import React, { useEffect, useState } from "react";
import { createToko } from "../api/tokoApi";
import Input from "../components/Input";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const CreateToko = () => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = TokenHandler();
    console.log(token);
    const tokenData = DecodeToken();
    console.log({ tokenData });
    setUserId(tokenData._id);
  }, []);
  const createTokoHandler = async (e) => {
    e.preventDefault();

    const data = {
      nama: nama,
      deskripsi: deskripsi,
      image: image,
    };

    try {
      const res = await createToko(data, userId);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={createTokoHandler}
      className="flex flex-col gap-3 items-center justify-center h-[500px] min-h-screen max-w-[500px] mx-auto p-10"
    >
      <Input label="Nama" type={"text"} onChange={(e) => setNama(e.target.value)} value={nama} />
      <Input
        label="Deskripsi"
        type={"text"}
        onChange={(e) => setDeskripsi(e.target.value)}
        value={deskripsi}
      />
      <Input label="Image" type={"file"} onChange={(e) => setImage(e.target.files[0])} />
      <button className="btn btn-error w-full mt-3">Login</button>
    </form>
  );
};

export default CreateToko;
