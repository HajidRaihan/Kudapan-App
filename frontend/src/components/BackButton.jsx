import BackIcon from "../assets/icon/arrow-left.svg";

const BackButton = () => {
  const backHandler = () => {
    window.history.back();
  };
  return (
    <div onClick={backHandler}>
      <img src={BackIcon} alt="" className="w-5 h-5" />
    </div>
  );
};

export default BackButton;
