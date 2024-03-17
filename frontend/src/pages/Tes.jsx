import axios from "axios";
import React, { useEffect, useState } from "react";

const Tes = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getTes = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/tes");
      console.log(res.data.data);
      setData(res.data.data);
    };
    getTes();
  }, []);
  return <div>{data}</div>;
};

export default Tes;
