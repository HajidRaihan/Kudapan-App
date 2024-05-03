import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Header from "../components/Header";
import { TokenHandler } from "../helper/TokenHandler";
import { DecodeToken } from "../helper/DecodeToken";
import { editProfile, getUserById } from "../api/userApi";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { styled } from "styled-components";

const EditIcon = styled(Edit)`
  color: #fff;
  width: 16px;
`;

const EditProfile = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();
  const [imageValue, setImageValue] = useState();
  const [profilePreview, setProfilePreview] = useState();

  useEffect(() => {
    const token = TokenHandler();
    console.log(token);
    const tokenData = DecodeToken();
    console.log({ tokenData });
    setUserId(tokenData._id);
  }, []);

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const res = await getUserById(userId);
        setUsername(res.nama);
        setEmail(res.email);
        setImage(res.image);
        console.log({ res });
      } catch (error) {
        console.error("Gagal mendapatkan detail user:", error);
      }
    };
    if (userId) {
      getDetailUser();
    }
  }, [userId]);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const data = {
      nama: username,
      email: email,
      image: imageValue,
    };

    // return console.log({ data });
    try {
      const res = await editProfile(userId, data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePreview(URL.createObjectURL(event.target.files[0]));
    setImageValue(file);
  };

  return (
    <div className="xl:mx-96 lg:mx-32">
      <Header title="Edit Profile" />
      <div className="mt-10">
        <div>
          <div className="relative w-fit mx-auto">
            {image !== null ? (
              <img
                src={`http://localhost:8000/images/${image}`}
                alt="profile"
                className={`${
                  profilePreview ? "hidden" : "block"
                } w-40 h-40 rounded-full mx-auto object-cover object-center`}
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="profile"
                className={`${
                  profilePreview ? "hidden" : "block"
                } w-40 h-40 rounded-full mx-auto object-cover object-center`}
              />
            )}
            <img
              src={profilePreview}
              alt=""
              className={`${
                profilePreview ? "block" : "hidden"
              } w-40 h-40 rounded-full mx-auto object-cover object-center`}
            />
            {/* <div className="w-40 h-40 absolute z-50 bg-black top-0 rounded-full opacity-30"></div> */}
            <label htmlFor="image">
              <div className="absolute bottom-0 right-3 w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center hover:bg-gray-600">
                <EditIcon />
              </div>
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept=".png,.jpg,.jpeg"
              className="hidden"
            />
          </div>
        </div>
      </div>
      <div className="mx-10 mt-5">
        <Input
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Email"
          placeholder="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={editProfileHandler} className="w-full btn bg-primary mt-5 text-white">
          submit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
