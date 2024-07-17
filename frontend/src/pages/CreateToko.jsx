import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
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
      toast.error("terjadi kesalahan saat membuat toko");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center">
      <Toaster />
      <form
        onSubmit={createTokoHandler}
        className="flex flex-col gap-4 items-center justify-center md:shadow-xl drop-shadow-md md:border border-slate-500 h-[550px] w-[400px] rounded-xl mx-auto p-10"
      >
        <h className="text-4xl font-semibold mb-10 text-primary">Buat Toko</h>
        {/* <Input label="Email" type={"email"} onChange={emailOnChange} value={email} /> */}
        {/* <Input label="Password" type={"password"} onChange={passwordOnChange} value={password} /> */}
        <label class="input input-bordered flex items-center gap-2 w-full rounded-2xl">
          <input
            type="text"
            class="grow"
            placeholder="Nama Toko"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full rounded-2xl">
          <input
            type="text"
            className="grow"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Gambar Toko</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs file-input-sm file-input-error"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button className="btn btn-error w-full mt-3 text-white rounded-2xl">Submit</button>
      </form>
    </div>
    // <form
    //   onSubmit={createTokoHandler}
    //   className="flex flex-col gap-3 items-center justify-center h-[500px] min-h-screen max-w-[500px] mx-auto p-10"
    // >
    //   <Input label="Nama" type={"text"} onChange={(e) => setNama(e.target.value)} value={nama} />
    //   <Input
    //     label="Deskripsi"
    //     type={"text"}
    //     onChange={(e) => setDeskripsi(e.target.value)}
    //     value={deskripsi}
    //   />
    //   <Input label="Image" type={"file"} onChange={(e) => setImage(e.target.files[0])} />
    //   <button className="btn btn-error w-full mt-3">Login</button>
    // </form>
  );
};

export default CreateToko;
