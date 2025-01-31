import React, { useEffect, useState } from "react";
import { addProdukKeranjang } from "../../api/keranjangApi";
import { addProduk } from "../../api/produkApi";
import ButtonSubmit from "../ButtonSubmit";
import { Toaster } from "react-hot-toast";

const NewProdukModals = ({ close, userId, produkDetail, isSuccess, isError, setDetailToko }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [tipe, setTipe] = useState("makanan");
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log({ produkDetail });

  const namaOnChange = (e) => {
    setNama(e.target.value);
  };

  const hargaOnChange = (e) => {
    setHarga(e.target.value);
  };

  const tipeOnChange = (e) => {
    setTipe(e.target.value);
    console.log(e.target.value);
  };

  const imageOnChange = (e) => {
    setImage(e.target.files[0]);
  };

  const newProdukHandler = async (e) => {
    e.preventDefault();

    const data = {
      nama: nama,
      harga: harga,
      type: tipe,
      image: image,
    };

    setIsLoading(true);

    console.log({ data });
    try {
      //   const res = await addProduk(userId, data);
      const res = await addProduk(userId, data);
      setIsLoading(false);
      console.log(res);
      if (res) {
        isSuccess();
        close();
        setDetailToko((prevDetailToko) => ({
          ...prevDetailToko,
          produk: [...prevDetailToko.produk, { nama, harga, type: tipe, image: res.produk.image }],
        }));
      }
    } catch (error) {
      console.error(error);
      // close();
      isError(error.response.data.error);
      // console.log(error.response.data.error);
      // toast.error("gagal menambahkan produk");

      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.getElementById("ordermodal").showModal();
  }, []);

  return (
    <dialog id={"ordermodal"} className="modal py-10">
      <Toaster />
      <div className="modal-box flex flex-col items-center">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3">Tambahkan Produk</h3>

        <form action="" className="flex flex-col gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nama Produk</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={namaOnChange}
              value={produkDetail?.nama || nama}
              // defaultValue={produkDetail?.nama}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Harga Produk</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={hargaOnChange}
              value={harga}
              defaultValue={produkDetail?.harga}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Pilih Tipe Produk</span>
            </div>
            <select className="select select-bordered w-full" onChange={tipeOnChange} value={tipe}>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Gambar Produk</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full file-input-sm file-input-ghost"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <ButtonSubmit title={"Tambah Produk"} handler={newProdukHandler} isLoading={isLoading} />
          {/* <button onClick={tes}>asdlasjk</button> */}
        </form>
      </div>
    </dialog>
  );
};

export default NewProdukModals;
