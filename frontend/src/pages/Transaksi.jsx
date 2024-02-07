import CardTransaksi from "../components/CardTransaksi";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";

const Transaksi = () => {
  return (
    <>
      <div className="mb-32 mx-5 mt-5">
        <Header title="Riwayat Transaksi" />
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
