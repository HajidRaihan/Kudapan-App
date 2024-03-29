// eslint-disable-next-line react/prop-types
// const Banner = ({ title }) => {
//   return (
//     <div className="h-32 bg-[#7D0A0A] rounded-b-[40px] flex justify-center items-center">
//       <p className="text-white text-2xl font-medium">{title}</p>
//     </div>
//   );
// };

import BannerImg from "../assets/banner-img.jpg";
import PropTypes from "prop-types";

const Banner = ({ title }) => {
  return (
    <div className="h-32  rounded-b-[40px] flex justify-center items-center relative mx-5 my-5 rounded-2xl">
      <img
        src={BannerImg}
        alt="banner"
        className="object-center object-cover w-full h-full rounded-2xl"
      />
      <div className="absolute h-full w-full bg-black opacity-35 rounded-2xl" />
      <p className="text-slate-50 text-2xl font-bold absolute drop-shadow-2xl shadow-black">
        {title}
      </p>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Banner;
