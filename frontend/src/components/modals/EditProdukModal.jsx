import React, { useEffect, useState } from "react";
import { addProdukKeranjang } from "../../api/keranjangApi";
import { editProduk, getDetailProduk } from "../../api/produkApi";

const EditProdukModal = ({ close, userId, produkId }) => {
  const [nama, setNama] = useState();
  const [harga, setHarga] = useState();
  const [tipe, setTipe] = useState();
  const [image, setImage] = useState();
  const [detailProduk, setDetailProduk] = useState();

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

    console.log(data);
    try {
      //   const res = await addProduk(userId, data);
      const res = await editProduk(userId, produkDetail._id, data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   document.getElementById("ordermodal").showModal();
  // }, []);

  useEffect(() => {
    const getProdukById = async () => {
      const res = await getDetailProduk(produkId);
      console.log(res);
      if (res) {
        setDetailProduk(res);
        document.getElementById("ordermodal").showModal();
      }

      // setNama(res.nama);
      // setHarga(res.harga);
      // setTipe(res.tipe);
      // setImage(res.image);
    };
    getProdukById();
  }, [produkId]);

  return (
    <>
      {detailProduk ? (
        <dialog id={"ordermodal"} className="modal py-10">
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nama Produk</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={namaOnChange}
                  value={detailProduk.nama || ""}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Harga Produk</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={hargaOnChange}
                  value={detailProduk.harga || ""}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pilih Tipe Produk</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={tipeOnChange}
                  value={detailProduk.tipe || ""}
                >
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gambar Produk</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs file-input-sm file-input-success"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <div className="">
                <button
                  className="btn btn-success w-full my-2  text-white"
                  onClick={newProdukHandler}
                >
                  Tambahkan Produk
                </button>
                {/* <button className="btn btn-error w-full text-white">Order Langsung</button> */}
              </div>
            </form>
          </div>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
};

export default EditProdukModal;
