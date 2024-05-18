import React from "react";
import QRCode from "react-qr-code";

const QrTransaksi = ({ value }) => {
  return (
    <div>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 500, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
        <p>{value}</p>
      </div>
    </div>
  );
};

export default QrTransaksi;
