import React, { useEffect, useState } from "react";
import { getPesanan } from "../../api/pesananApi";
import VendorLayout from "../../components/layout/VendorLayout";
import { DecodeToken } from "../../helper/DecodeToken";
import FormatRupiah from "../../helper/FormatRupiah";

const RekapPesanan = () => {
  const [pesananData, setPesananData] = useState([]);
  const [userId, setUserId] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokenData = DecodeToken();
    setUserId(tokenData._id);
    console.log(tokenData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      setIsLoading(true);

      try {
        const res = await getPesanan(userId, "", startDate, endDate);
        const pesanan = res.data.filter((pesanan) => pesanan.status_pembayaran === "lunas");
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

  return (
    <VendorLayout>
      <div className="w-full bg-white shadow-lg p-4 md:p-8 mt-5 border rounded-lg">
        <div className="mb-4 flex flex-col md:flex-row justify-between">
          <label className="mb-2 md:mb-0 md:mr-2 text-xs">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="ml-2 p-1 border rounded w-full md:w-auto"
            />
          </label>
          <label className="text-xs">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="ml-2 p-1 border rounded w-full md:w-auto"
            />
          </label>
        </div>
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
            <tbody>
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
                    Loading...
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
};

export default RekapPesanan;
