import React, { useEffect, useState } from "react";

import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, getGroupedLead } from "../../features/leadsSlice";
import { fetchTagsAsync } from "../../features/tagSlice";
import MobileSidebar from "../../components/MobileSidebar";
import { fetchLeadsByQuery } from "../../features/filterSlice";

function LeadsByStatus() {
  const status = useParams();
  const dispatch = useDispatch();

  const statusGrouped = useSelector(
    (state) => state.leads.statusGrouped.leadsByStatus
  );
  const { leads } = useSelector((state) => state.leads);
  const { filters } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getGroupedLead());
    dispatch(fetchLeads());
  }, [dispatch]);

  const findGroup = Object.entries(statusGrouped)
    .filter(([keys, values]) => keys === status?.status)
    .map((lead) => lead[1]);

  console.log(findGroup, "group");

  const filteredLeads = Object.values(
    leads.reduce((acc, lead) => {
      if (!acc[lead.salesAgent.name]) acc[lead.salesAgent.name] = lead;
      return acc;
    }, {})
  );

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };

  const leadMapping = filters && filters?.length > 0 ? filters : findGroup;

  return (
    <>
      <LeadHeading status={status?.status} />
      <div className="row" style={{ marginTop: "52px" }}>
        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2 d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
          <MobileSidebar />
          <div className="container-fluid px-2">
            <div className="row">
              <h2 className="mt-2">Lead Status: {status.status}</h2>
            </div>
            <hr />
            <div className="py-2">
              <div className="row">
                <div className="col-auto">
                  <h4>Filters</h4>
                </div>
                <span className="col-md-2  ">
                  <select
                    className="form-select"
                    onChange={(event) =>
                      handleFilterChange("salesAgent", event.target.value)
                    }
                  >
                    <option value="">Select Agent</option>
                    {filteredLeads &&
                      filteredLeads?.map((lead, index) => (
                        <option key={index} value={lead.salesAgent._id}>
                          {lead.salesAgent.name}
                        </option>
                      ))}
                  </select>
                </span>

                <span className="col-md-2  ">
                  <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("prioritySort", event.target.value)
                    }
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </span>
                <span className="col-md-2">
                  <select
                    className="form-select "
                    onChange={(event) =>
                      handleFilterChange("source", event.target.value)
                    }
                  >
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisment">Advertisment</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                    {}
                  </select>
                </span>
                {/* <span className="col-md-2">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(event) =>
                        handleFilterChange("timeToClose", "minToHigh")
                      }
                    />{" "}
                    Time to Close
                  </label>
                </span> */}
              </div>
            </div>
            <div className="py-2">
              <div>
                {leadMapping?.length > 0 &&
                  leadMapping?.map((lead) => (
                    <div
                      className="card bg-success-subtle border-0 mt-2"
                      key={lead._id}
                    >
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-auto ">
                            <strong>{lead?.name}</strong>
                          </div>
                          <div className="col-auto ">
                            Sales Agent: {lead.salesAgent?.name}{" "}
                          </div>
                          <div className="col-auto ">
                            Priority: {lead.priority}
                          </div>
                          <div className="col-auto ">Source: {lead.source}</div>
                          <div className="col-auto ">
                            Time to Close: {lead.timeToClose}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsByStatus;
