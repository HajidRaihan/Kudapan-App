import { useState } from "react";
import { deleteProduk } from "../../api/produkApi";
import DeleteIcon from "../../assets/icon/delete-white.svg";
import EditIcon from "../../assets/icon/edit.svg";
import KonfirmasiModal from "../KonfirmasiModal";
import EditProdukModal from "../modals/EditProdukModal";
import toast, { Toaster } from "react-hot-toast";

const MenuCardVendor = ({ userId, openEditModal, setDetailToko, ...produk }) => {
  const [hapusModalOpen, setHapusModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const deleteHandler = async () => {
    try {
      const res = await deleteProduk(userId, produk._id);
      toast.success("Berhasil menghapus produk");
      setIsSuccess(true);
      console.log(res);
      setHapusModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
      <Toaster />
      <div className="h-full">
        <img
          src={`http://localhost:8000/images/${produk.image}`}
          alt="image transaksi"
          className="object-cover min-w-32 w-32 h-full rounded-lg object-center"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-md font-bold">{produk.nama}</h1>
        <p className="text-xs font-medium">Harga : {produk.harga}</p>
      </div>
      <div className="absolute bottom-1 right-1">
        <div
          className="btn btn-success p-2 w-fit h-fit  rounded-lg  btn-sm mr-1"
          onClick={openEditModal}
        >
          <img src={EditIcon} alt="" className="h-4 w-4 " />
        </div>
        <div
          className="bg-primary p-2 w-fit h-fit  rounded-lg btn btn-error btn-sm"
          onClick={() => setHapusModalOpen(true)}
        >
          <img src={DeleteIcon} alt="" className="h-4 w-4 " />
        </div>
      </div>

      {hapusModalOpen && (
        <KonfirmasiModal
          action="Hapus"
          title="Apakah anda ingin menghapus produk ini?"
          handler={deleteHandler}
          close={() => setHapusModalOpen(false)}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </div>
  );
};

export default MenuCardVendor;
