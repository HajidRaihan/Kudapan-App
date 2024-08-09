import PlusIcon from "../assets/icon/plus.svg";
import MinusIcon from "../assets/icon/minus.svg";
import FormatRupiah from "../helper/FormatRupiah";
import PropTypes from "prop-types";

const KeranjangCard = ({
  keranjangIndex,
  produkIndex,
  deleteProdukKeranjangHandler,
  increaseProdukKeranjangHandler,
  ...produk
}) => {
  console.log(keranjangIndex, produkIndex);

  return (
    <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
      <div className="h-full">
        <img
          src={`${import.meta.env.VITE_IMGURL}/${produk.image}`}
          alt="image transaksi"
          className="object-cover min-w-32 max-w-32 h-full rounded-lg object-center"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-md font-bold">{produk.nama}</h1>
        <p className="text-[10px]">
          Harga : <FormatRupiah value={produk.harga} />
        </p>
        <p className="text-[10px]">Jumlah : {produk.jumlah}</p>
        <p className="text-[10px]">Catatan : {produk.catatan}</p>
        <p className="text-xs font-semibold">
          Total : <FormatRupiah value={produk.total} />
        </p>
      </div>
      <div className="absolute bottom-1 right-1 flex gap-2">
        <div
          className=" flex items-center justify-center  rounded-full bg-primary text-white hover:bg-secondary h-5 w-5 cursor-pointer"
          onClick={() => deleteProdukKeranjangHandler(keranjangIndex, produkIndex)}
        >
          <img src={MinusIcon} alt="" className="h-3 w-3 " />
        </div>
        <div
          className=" flex items-center justify-center  rounded-full bg-primary text-white hover:bg-secondary h-5 w-5 cursor-pointer"
          onClick={() => increaseProdukKeranjangHandler(keranjangIndex, produkIndex)}
        >
          <img src={PlusIcon} alt="" className="h-3 w-3 " />
        </div>
      </div>
    </div>
  );
};
KeranjangCard.propTypes = {
  keranjangIndex: PropTypes.number.isRequired,
  produkIndex: PropTypes.number.isRequired,
  deleteProdukKeranjangHandler: PropTypes.func.isRequired,
  increaseProdukKeranjangHandler: PropTypes.func.isRequired,
  produk: PropTypes.object.isRequired,
};

export default KeranjangCard;
