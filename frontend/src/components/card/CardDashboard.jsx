import React from "react";

const CardDashboard = ({ count, title }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-60 h-32">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">{title}</h3>
        <div>
          {/* <p className="text-sm text-muted-foreground">Vendors</p> */}
          <p className="text-xl font-semibold text-primary-foreground">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
