import React, { useEffect, useState } from "react";
import { addProdukKeranjang } from "../../api/keranjangApi";
import { editProduk, getDetailProduk } from "../../api/produkApi";
import ButtonSubmit from "../ButtonSubmit";
import Loader from "../Loader";

const EditProdukModal = ({ close, userId, produk, setDetailToko, isSuccess, isError }) => {
  const [nama, setNama] = useState();
  const [harga, setHarga] = useState();
  const [tipe, setTipe] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [detailProduk, setDetailProduk] = useState();

  useEffect(() => {
    if (produk) {
      setNama(produk.nama);
      setHarga(produk.harga);
      setTipe(produk.tipe);
      setImage(produk.image);
    }
  }, [produk]);

  const namaOnChange = (e) => {
    setNama(e.target.value);
    console.log(e.target.value);
  };

  const hargaOnChange = (e) => {
    setHarga(e.target.value);
  };

  const tipeOnChange = (e) => {
    setTipe(e.target.value);
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

    console.log(data);
    try {
      //   const res = await addProduk(userId, data);
      const res = await editProduk(userId, produk._id, data);
      console.log(res);
      setIsLoading(false);
      setDetailToko((prevDetailToko) => {
        const updatedProduk = prevDetailToko.produk.map((p) =>
          p._id === produk._id ? { ...p, ...data, image: res.data.image || p.image } : p
        );
        return { ...prevDetailToko, produk: updatedProduk };
      });
      isSuccess();
      close();
    } catch (error) {
      console.error(error);
      isError;
      setIsLoading(false);
      close();
    }
  };

  return (
    <>
      {produk ? (
        <dialog open id={"ordermodal"} className="modal py-10">
          <div className="modal-box flex flex-col items-center">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={close}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-3">Edit Produk</h3>

            <form action="" className="flex flex-col gap-3">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Nama Produk</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  onChange={namaOnChange}
                  value={nama}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Harga Produk</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  onChange={hargaOnChange}
                  value={harga}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Pilih Tipe Produk</span>
                </div>
                <select
                  className="select select-bordered w-full "
                  onChange={tipeOnChange}
                  value={tipe}
                >
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                </select>
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Gambar Produk</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full file-input-sm file-input-ghost"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <div className="">
                {/* <button
                  className="btn btn-success w-full my-2  text-white"
                  onClick={newProdukHandler}
                >
                  Edit Produk
                </button> */}
                <button
                  className="btn btn-success w-full text-white "
                  onClick={newProdukHandler}
                  disabled={isLoading}
                >
                  {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                  <p>EditProduk</p>
                </button>
                {/* <button className="btn btn-error w-full text-white">Order Langsung</button> */}
              </div>
            </form>
          </div>
        </dialog>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditProdukModal;
