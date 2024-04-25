import React from "react";
import QRCode from "react-qr-code";

const QrTransaksi = () => {
  return (
    <div>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 500, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={import.meta.env.BASE_URL}
          viewBox={`0 0 256 256`}
        />
        <p>{import.meta.env.BASE_URL}</p>
      </div>
    </div>
  );
};

export default QrTransaksi;
