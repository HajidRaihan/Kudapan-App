import { useEffect, useState } from "react";
import { getPesanan } from "../../api/pesananApi";
import VendorLayout from "../../components/layout/VendorLayout";
import { DecodeToken } from "../../helper/DecodeToken";
import FormatRupiah from "../../helper/FormatRupiah";
import { getIncomeVendor, getIncomeVendorToday } from "../../api/orderAPi";
import { format } from "date-fns";

const today = new Date();
const formattedDate = format(today, "d/M/yyyy"); // Format: M/d/yyyy

const RekapPesanan = () => {
  const [pesananData, setPesananData] = useState([]);
  const [userId, setUserId] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeFilter, setTotalIncomeFilter] = useState();
  const [totalIncomeToday, setTotalIncomeToday] = useState();

  useEffect(() => {
    const tokenData = DecodeToken();
    setUserId(tokenData._id);
    console.log(tokenData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const res = await getIncomeVendor(userId);
      setTotalIncome(res.data[0].totalIncome);
      console.log({ res });
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const res = await getIncomeVendorToday(userId);
      setTotalIncomeToday(res.data);
      console.log("pendapatan hari ini", res);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      setIsLoading(true);

      try {
        const res = await getPesanan(userId, "", startDate, endDate);
        const pesanan = res.data.filter((pesanan) => pesanan.status_pembayaran === "lunas");
        console.log(pesanan);
        const totalIncomeWithFilter = pesanan.reduce(
          (total, pesanan) => total + pesanan.total_harga,
          0
        );

        setTotalIncomeFilter(totalIncomeWithFilter);
        setPesananData(pesanan);
        setIsLoading(false);
      } catch (error) {
        console.error("Gagal memuat data pesanan:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const clearFilterHandler = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <VendorLayout>
      <div className="mb-3 border mt-5 p-4 md:p-5 rounded-md mx-5 w-fit bg-white shadow-md">
        <div className="gap-5 flex flex-raw md:flex-row mb-2 h-full">
          <label className="mb-2 md:mb-0 md:mr-2 text-xs flex flex-col gap-2">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className=" p-1 border rounded w-full md:w-auto"
            />
          </label>
          <label className="text-xs flex flex-col gap-2">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className=" p-1 border rounded w-full md:w-auto"
            />
          </label>
          <div className="min-h-full flex items-end">
            <button
              className="text-xs btn bg-primary text-white btn-sm font-medium"
              onClick={clearFilterHandler}
            >
              Hapus filter
            </button>
          </div>
        </div>
      </div>
      <div className="flex mx-5">
        <div className="w-full h-20 border  flex flex-col p-5 justify-center rounded-md shadow-md">
          <div>
            <h1 className="text-base font-semibold">Total Penghasilan</h1>
            <p className="text-sm">
              <FormatRupiah value={totalIncome} />
            </p>
          </div>
        </div>
        <div className="w-full h-20 border mx-5 flex flex-col p-5 justify-center rounded-md shadow-md">
          <div>
            <h1 className="text-base font-semibold">Total Penghasilan Hari ini</h1>
            <p className="text-sm">
              <FormatRupiah value={totalIncomeToday} />
            </p>
          </div>
        </div>
        <div className="h-20 w-full border flex flex-col p-5 justify-center rounded-md shadow-md">
          <div>
            <h1 className="text-base font-semibold">Total Penghasilan Filter</h1>
            <p className="text-sm">
              <FormatRupiah value={endDate || startDate ? totalIncomeFilter : 0} />
            </p>
          </div>
        </div>
      </div>

      <div className="mx-5 bg-white shadow-md p-4 md:p-8 mt-3 border rounded-lg">
        <div className="overflow-x-auto text-xs">
          <table className="table-auto w-full">
            <thead className="bg-base-200">
              <tr>
                <th className="p-2 text-left">No</th>
                <th className="p-2 text-left">Pemesan</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Waktu</th>
              </tr>
            </thead>
            {/* <tbody>
              {pesananData.length > 0 ? (
                pesananData.map((pesanan, index) => (
                  <tr key={pesanan._id}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{pesanan.user_pemesan.nama}</td>
                    <td className="p-2">
                      <FormatRupiah value={pesanan.total_harga} />
                    </td>
                    <td className="p-2">
                      {new Date(pesanan.waktu_pemesanan).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    No orders found within the specified date range.
                  </td>
                </tr>
              )}
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    <span className="loading loading-spinner text-error loading-lg"></span>
                  </td>
                </tr>
              ) : null}
            </tbody> */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    <span className="loading loading-dots text-error loading-sm"></span>
                  </td>
                </tr>
              ) : pesananData.length > 0 ? (
                pesananData.map((pesanan, index) => (
                  <tr key={pesanan._id}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{pesanan.user_pemesan.nama}</td>
                    <td className="p-2">
                      <FormatRupiah value={pesanan.total_harga} />
                    </td>
                    <td className="p-2">
                      {new Date(pesanan.waktu_pemesanan).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    No orders found within the specified date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="w-full flex justify-center">
            <div className="join mt-5 mx-auto">
              <button className="join-item btn">1</button>
              <button className="join-item btn btn-active">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
            </div>  
          </div> */}
        </div>
      </div>
    </VendorLayout>
  );
};

export default RekapPesanan;
