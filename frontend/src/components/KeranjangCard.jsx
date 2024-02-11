const KeranjangCard = ({ ...produk }) => {
  return (
    <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
      <div className="h-full">
        <img
          src={`http://localhost:8000/images/${produk.image}`}
          alt="image transaksi"
          className="object-cover w-32 h-full rounded-lg object-center"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-md font-bold">{produk.nama}</h1>
        <p className="text-[10px]">Harga : {produk.harga}</p>
        <p className="text-[10px]">Jumlah : {produk.jumlah}</p>
        <p className="text-[10px]">Catatan : {produk.catatan}</p>
        <p className="text-xs font-semibold">Total : {produk.total}</p>
      </div>
    </div>
  );
};

export default KeranjangCard;
