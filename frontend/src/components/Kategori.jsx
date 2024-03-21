// eslint-disable-next-line react/prop-types
const Kategori = ({ title, selected, handler }) => {
  return (
    <div>
      <div
        className={`py-1 text-xs px-2 flex justify-center border rounded-xl cursor-pointer ${
          selected && "bg-primary text-white"
        }`}
        onClick={handler}
      >
        {title}
      </div>
    </div>
  );
};

export default Kategori;
