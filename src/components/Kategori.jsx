// eslint-disable-next-line react/prop-types
const Kategori = ({ title, selected }) => {
  return (
    <div>
      <div
        className={`py-1 text-xs px-2 flex justify-center border border-slate-500 rounded-xl ${
          selected && "bg-[#7D0A0A] text-white"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default Kategori;
