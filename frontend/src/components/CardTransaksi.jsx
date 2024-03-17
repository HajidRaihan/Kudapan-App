const CardTransaksi = ({ ...produk }) => {
  return (
    <>
      {/* <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
        <div className="h-full">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="image transaksi"
            className="object-cover w-20 h-full rounded-lg object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-md font-bold">Nasi Goreng</h1>
          <p className="text-[10px]">Total Belanja</p>
          <p className="text-xs font-semibold">Rp. 10.000</p>
        </div>
        <div className="badge bg-secondary absolute bottom-2 right-2 text-white text-xs">
          dalam proses
        </div>
      </div> */}

      <div className="w-full h-24 rounded-xl mt-5 border-slate-500 border flex relative gap-2">
        <div className="h-full">
          <img
            src={`http://localhost:8000/images/${produk.image}`}
            alt="image transaksi"
            className="object-cover min-w-32 h-full rounded-lg object-center"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-md font-bold truncate w-48">{produk.nama}</h1>
          <p className="text-[10px]">Harga : {produk.harga}</p>
          <p className="text-[10px]">Jumlah : {produk.jumlah}</p>
          <p className="text-[10px]">Catatan : {produk.catatan}</p>
          <p className="text-xs font-semibold">Total : {produk.total}</p>
        </div>
      </div>
    </>
  );
};

export default CardTransaksi;
