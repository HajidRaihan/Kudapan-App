import DeleteIcon from "../assets/icon/delete-white.svg";
import EditIcon from "../assets/icon/edit.svg";

const MenuCardVendor = ({ ...produk }) => {
  return (
    <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
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
          onClick={() => deleteProdukKeranjangHandler(keranjangIndex, produkIndex)}
        >
          <img src={EditIcon} alt="" className="h-4 w-4 " />
        </div>
        <div
          className="bg-primary p-2 w-fit h-fit  rounded-lg btn btn-error btn-sm"
          onClick={() => increaseProdukKeranjangHandler(keranjangIndex, produkIndex)}
        >
          <img src={DeleteIcon} alt="" className="h-4 w-4 " />
        </div>
      </div>
    </div>
  );
};

export default MenuCardVendor;
