import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";

import { StatusGrouped } from "../../components/homeComponents/StatusGrouped";
import AllLeads, { AddLead } from "../../components/homeComponents/AllLeads";
import LeadFilters from "../../components/homeComponents/LeadFilters";
import MobileSidebar from "../../components/MobileSidebar";

function Home() {
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
            <div className="text-center bg-success-subtle rounded py-5 mt-3">
              <h1 className="mt-4">Dashboard</h1>
              <span className="fw-light fs-5">Leads overview & summary</span>
            </div>
            <div className="py-2">
              <div className="row">
                <h2 className="mt-2">
                  Leads <AddLead />
                </h2>
              </div>
              <hr />
              <AllLeads />
            </div>
            <div className="py-2 ">
              <h2 className="mt-2">Lead Status</h2>
              <hr />
              <StatusGrouped />
            </div>
            <LeadFilters />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
