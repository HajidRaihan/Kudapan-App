import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { getDetailOrder } from "../../api/orderAPi";
import CardTransaksi from "../../components/card/CardTransaksi";
import Header from "../../components/Header";
import VendorLayout from "../../components/layout/VendorLayout";
import TimeAgo from "../../helper/TimeAgo";
import QrTransaksi from "../QrTransaksi";

const DetailPesanan = () => {
  const { orderId, userId } = useParams();

  return (
    <div className="mb-20">
      <VendorLayout>
        {/* <Toaster /> */}
        <Header title="Pesanan" />

        <div className="m-5">
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 500, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`localhost:5173/payment/${orderId}/${userId}`}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p>
            localhost:5173/payment/{orderId}/{userId}
          </p>
        </div>
      </VendorLayout>
    </div>
  );
};

export default DetailPesanan;
