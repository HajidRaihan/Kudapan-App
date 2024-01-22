import BackIcon from "../assets/icon/arrow-left.svg";

const BackButton = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center opacity-50">
      <img src={BackIcon} alt="" className="w-5 h-5" />
    </div>
  );
};

export default BackButton;
