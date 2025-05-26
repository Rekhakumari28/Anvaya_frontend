import React from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import ReportComponent from "./ReportComponent";
import MobileSidebar from "../../components/MobileSidebar";

function Reports() {
  return (
    <>
      <LeadHeading />
      <div className="row" style={{ marginTop: "52px" }}>
        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2 col-md-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
          <MobileSidebar />
          <div className="container-fluid px-2">
            <div className="py-2">
              <ReportComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
