import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { fetchLeads, getGroupedLead } from "../../features/leadsSlice";
import { fetchLeadsByQuery } from "../../features/filterSlice";

function Home() {
  const [filteredValue, setFilterdValue] = useState("");
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => {
    return state.leads;
  });

  const statusGrouped = useSelector((state) => {
    return state.leads.statusGrouped.leadsByStatus;
  });

  const { filters } = useSelector((state) => {
    return state.filters;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  useEffect(() => {
    dispatch(getGroupedLead());
  }, []);

  const StatusBy = () => {
    if (statusGrouped) {
      return Object.entries(statusGrouped).map(([keys, values], index) => {
        return (
          <div key={index} className="cols">
            <div className="cards card-statusGrouped  ">
              <div className="cards-body ">
              <strong> {keys}</strong> : {values.length} Leads
                <Link
                className="button-primary"
                  to={`/leadsByStatus/${keys}`}
                  style={{ textDecoration: "none" }}
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilterdValue(value);
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };

  return (
    <>
      <LeadHeading />
      <div className="mainContent">
        <div className="rows ">
          <div>
            <SidebarNav />
          </div>
          <div className="cols ">
            <div className=" sections">
              <h4 className="content-heading">
                {filters?.length > 0 ? " Lead List by Status:" : "All Leads:"}
              </h4>
              <div className="hr-gray">
                <hr />
              </div>
              <div className="rows">
                {error && <p>{error}</p>}
                {status === "Loading" ? (
                  <p>Loading...</p>
                ) : filters?.length > 0 ? (
                  filters?.map((lead) => (
                    <div className="cols col-mds " key={lead._id}>
                      <Link
                        to={`/leadDetails/${lead._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="cards">
                          <div className="cards-body">
                            <h4 className="marginLead">{lead.name}</h4>
                            <p className="marginLead">
                              Sales Agent: {lead.salesAgent.name}
                            </p>
                            <p className="marginLead">Status: {lead.status}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  leads.map((lead) => (
                    <div className="cols col-mds " key={lead._id}>
                      <Link
                        to={`/leadDetails/${lead._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="cards">
                          <div className="cards-body">
                            <h4 className="marginLead">{lead.name}</h4>
                            <p className="marginLead">
                              Sales Agent: {lead.salesAgent.name}
                            </p>
                            <p className="marginLead">Status: {lead.status}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className=" sections">
              <h4 className="content-heading">Lead Status:</h4>
              <div className="hr-gray">
                <hr />
              </div>
              <div className="rows">
                <StatusBy />
              </div>
            </div>
            <div className=" sections">
              <h4 className="content-heading">Filters:</h4>
              <div className="hr-gray">
                <hr />
              </div>
              <p className="rows" style={{ marginBottom: "0" }}>
                <span className="cols" style={{ margin: "0" }}>
                  Lead Status:{" "}
                </span>
                <span className="cols" style={{ margin: "0" }}>
                  <label className="me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="New"
                      name="status"
                      checked={filteredValue.includes("New")}
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    />{" "}
                    New
                  </label>{" "}
                  <label className="me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Contacted"
                      name="status"
                      checked={filteredValue.includes("Contacted")}
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    />{" "}
                    Contacted
                  </label>{" "}
                  <label className="me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Qualified"
                      name="status"
                      checked={filteredValue.includes("Qualified")}
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    />{" "}
                    Qualified
                  </label>{" "}
                  <label className="me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Proposal Sent"
                      name="status"
                      checked={filteredValue.includes("Proposal Sent")}
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    />{" "}
                    Proposal Sent
                  </label>{" "}
                  <label className="me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Closed"
                      name="status"
                      checked={filteredValue.includes("Closed")}
                      onChange={(event) =>
                        handleFilterChange("status", event.target.value)
                      }
                    />{" "}
                    Closed
                  </label>{" "}
                </span>
              </p>
            </div>
            <div
              className=" sections"
              style={{ textAlign: "center", paddingTop: "24px" }}
            >
              <Link to="/addLead" className="button">
                Add New Lead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
