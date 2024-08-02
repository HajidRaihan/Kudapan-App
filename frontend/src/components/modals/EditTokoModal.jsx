import React, { useEffect, useState } from "react";
import { editToko } from "../../api/tokoApi";
import { editProfile } from "../../api/userApi";

const EditTokoModal = ({ close, detailToko, isSuccess, isError, setDetailToko }) => {
  const [nama, setNama] = useState(detailToko.nama);
  const [deskripsi, setDeskripsi] = useState(detailToko.deskripsi);
  const [image, setImage] = useState(detailToko.image);

  const namaOnChange = (e) => {
    setNama(e.target.value);
    console.log(e.target.value);
  };
  const deskripsiOnChange = (e) => {
    setDeskripsi(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    document.getElementById("ordermodal").showModal();
  }, []);

  const editTokoHandler = async (e) => {
    e.preventDefault();
    const data = {
      nama: nama,
      deskripsi: deskripsi,
      image: image,
    };

    // return console.log({ data });
    try {
      const res = await editToko(data, detailToko._id);
      isSuccess();
      setDetailToko(res.toko);
      // window.location.reload();

      console.log(res);
    } catch (error) {
      console.error(error);
      close();
      isError();
    }
  };

  return (
    <>
      {detailToko ? (
        <dialog id={"ordermodal"} className="modal py-10">
          <div className="modal-box ">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={close}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-3">Edit Toko</h3>

            <form action="" className="flex flex-col gap-3">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Nama Toko</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={namaOnChange}
                  value={nama}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Deskripsi Toko</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  onChange={deskripsiOnChange}
                  value={deskripsi}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Gambar Toko</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full  file-input-sm file-input-success"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <div>
                <button
                  className="btn btn-success w-full my-2  text-white"
                  onClick={editTokoHandler}
                >
                  Submit
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

export default EditTokoModal;
