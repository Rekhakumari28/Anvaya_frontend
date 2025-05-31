import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadsByQuery } from "../../features/filterSlice";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { fetchLeads } from "../../features/leadsSlice";
import { AddLead } from "../../components/homeComponents/AllLeads";
import MobileSidebar from "../../components/MobileSidebar";

function LeadsList() {
  const { leads } = useSelector((state) => state.leads);
  const { filters } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSalesAgent());
    dispatch(fetchLeads());
  }, []);

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

  const leadMapping = filters && filters?.length > 0 ? filters : leads;
 
  // const handleTimeToCloseSort = () => {
  //   console.log("clicked");
  //   return filters.sort((a, b) => a.timeToClose - b.timeToClose) || leads.sort((a, b) => a.timeToClose - b.timeToClose);
  // };


  return (
    <>
      <LeadHeading />
      <div className="row" style={{ marginTop: "52px" }}>
        <div
          className="col-12 col-md-3 col-lg-2  d-none d-md-block"
          style={{ position: "fixed", overflowY: "auto" }}
        >
          <SidebarNav />
        </div>
        <div className="col-12 col-md-3 col-lg-2  d-none d-md-block"></div>

        <div className="col-12 col-md-9 col-lg-10 ">
          <MobileSidebar />
          <div className="container-fluid px-2 py-2">
            <div className="row">
              <h2 className="mt-2">Leads Overview</h2>
              <hr />
              <div className="row">
                <div className="col-auto">
                  <h4>Filters</h4>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    onChange={(event) =>
                      handleFilterChange("status", event.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="col-auto">
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
                </div>
                <div className="col-auto">
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
                </div>

                <div className="col-auto">
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
                </div>
                {/* <div className="col-auto">
                  <button
                    className="btn border"
                    onClick={() => handleTimeToCloseSort()}
                  >
                    Time to close
                  </button>
                </div> */}
                <div className="col-auto">
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                  <AddLead />
                </div>
              </div>
            </div>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th className=" bg-success-subtle " scope="table">
                    Lead Name
                  </th>
                  <th className=" bg-success-subtle" scope="table">
                    Status
                  </th>
                  <th className=" bg-success-subtle" scope="table">
                    Sales Agent
                  </th>

                  <th className="bg-success-subtle" scope="table">
                    Source
                  </th>
                  <th className=" bg-success-subtle" scope="table">
                    Priority
                  </th>
                  <th className=" bg-success-subtle" scope="table rounded-end">
                    Time to close
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider border container">
                {leadMapping &&
                  leadMapping.length > 0 &&
                  leadMapping?.map((lead) => (
                    <tr key={lead._id}>
                      <th scope="row">
                        <span>{lead.name}</span>
                      </th>
                      <td>
                        <span>{lead.status}</span>
                      </td>
                      <td>
                        <span>
                          {lead.salesAgent.name} ({lead.salesAgent.email})
                        </span>
                      </td>
                      <td>
                        <span>{lead.source}</span>
                      </td>
                      <td>
                        <span>{lead.priority}</span>
                      </td>
                      <td>
                        <span>{lead.timeToClose}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsList;
