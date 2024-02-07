// eslint-disable-next-line react/prop-types
const Kategori = ({ title, selected }) => {
  return (
    <div>
      <div
        className={`py-1 text-xs px-2 flex justify-center border rounded-xl ${
          selected && "bg-primary text-white"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default Kategori;
