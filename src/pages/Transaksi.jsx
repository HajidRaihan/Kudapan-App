import CardTransaksi from "../components/CardTransaksi";
import BottomNavigation from "../components/BottomNavigation";

const Transaksi = () => {
  return (
    <>
      <div className="mb-32 mx-5 mt-5">
        <p className="text-lg font-bold">Riwayat Transaksi</p>
        <div>
          <CardTransaksi />
          <CardTransaksi />
          <CardTransaksi />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Transaksi;
