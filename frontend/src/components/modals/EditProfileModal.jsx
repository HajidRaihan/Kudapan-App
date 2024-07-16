import React, { useEffect, useState } from "react";
import { editProfile } from "../../api/userApi";

const EditProfileModal = ({ close, detailProfile, userId, isSuccess, isError }) => {
  const [nama, setNama] = useState(detailProfile.nama);
  const [email, setEmail] = useState(detailProfile.email);

  const namaOnChange = (e) => {
    setNama(e.target.value);
    console.log(e.target.value);
  };
  const emailOnChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    document.getElementById("ordermodal").showModal();
  }, []);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const data = {
      nama: nama,
      email: email,
    };

    // return console.log({ data });
    try {
      const res = await editProfile(userId, data);
      isSuccess();
      window.location.reload();

      console.log(res);
    } catch (error) {
      console.error(error);
      close();
      isError();
    }
  };

  return (
    <>
      {detailProfile ? (
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
            <h3 className="font-bold text-lg mb-3">Edit Profile</h3>

            <form action="" className="flex flex-col gap-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Username</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={namaOnChange}
                  value={nama}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={emailOnChange}
                  value={email}
                />
              </label>
              <div>
                <button
                  className="btn btn-success w-full my-2  text-white"
                  onClick={editProfileHandler}
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

export default EditProfileModal;
