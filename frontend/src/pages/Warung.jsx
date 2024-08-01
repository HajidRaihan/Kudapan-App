import BottomNavigation from "../components/navigation/BottomNavigation";
import Kategori from "../components/Kategori";
import { useEffect, useState } from "react";
import { getProduk } from "../api/api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MenuCard from "../components/card/MenuCard";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import { PeopleQueue } from "@styled-icons/fluentui-system-filled/PeopleQueue";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PeopleQueueRed = styled(PeopleQueue)`
  color: #fff;
  width: 24px;
`;
const Warung = () => {
  const { tokoId } = useParams();
  const [tokoData, setTokoData] = useState();
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [search, setSearch] = useState("");
  const [orderCount, setOrderCount] = useState(true);

  const MySwal = withReactContent(Swal);

  // MySwal.fire({
  //   title: <p>Hello World</p>,
  //   didOpen: () => {
  //     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
  //     MySwal.showLoading();
  //   },
  // }).then(() => {
  //   return MySwal.fire(<p>Shorthand works too</p>);
  // });

  const showAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    getProduk(tokoId, selectedKategori, search).then((res) => {
      setTokoData(res);
      console.log(res);
    });
  }, [tokoId, selectedKategori, search]);

  const selectedKategoriHandler = (kategori) => {
    setSelectedKategori(kategori);
  };

  const listKategori = ["semua", "makanan", "minuman"];

  return (
    <MainLayout>
      {tokoData ? (
        <>
          <Header title={tokoData.toko} />
          <Toaster />
          <SearchBar value={search} handler={(e) => setSearch(e.target.value)} />
          <div className="flex gap-1 mt-2 mx-5 ">
            {listKategori.map((data, index) => {
              return (
                <Kategori
                  key={index}
                  title={data}
                  selected={data === selectedKategori}
                  handler={() => selectedKategoriHandler(data)}
                />
              );
            })}
          </div>
          <div className="p-2 bg-primary gap-1 flex items-center rounded-md mx-5 mt-2">
            <PeopleQueueRed />
            <p className="text-xs text-white">
              <b>{tokoData.incompleteOrder}</b> sedang mengantri
            </p>
          </div>
          <button onClick={showAlert} className="w-full h-10 bg-red-50">
            clickk
          </button>
          <div className="flex flex-wrap gap-5 justify-center mt-5 mb-20 ">
            {tokoData.produk.map((item) => (
              <>
                <MenuCard
                  key={item._id}
                  {...item}
                  isSuccess={() => toast.success("berhasil menambahkan ke keranjang")}
                  isError={() => toast.error("gagal menambahkan ke keranjang")}
                  setOrderCount={setOrderCount}
                />
              </>
            ))}
          </div>
          <div className="flex justify-center">
            <BottomNavigation orderCount={orderCount} />
          </div>
        </>
      ) : (
        ""
      )}
    </MainLayout>
  );
};

export default Warung;
