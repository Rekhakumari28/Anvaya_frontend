import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { Link } from "react-router-dom";
import { fetchLeads } from "../../features/leadsSlice";
import AddAgent from "./AddAgent";

function SalesAgentListComponent() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const agentList = useSelector((state) => {
    return state.salesAgent;
  });
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAllSalesAgent());
  }, []);

  return (
    <div className="py-2">
      <div className="row">
        <h2 className="mt-2">
          Sales Agents{" "}
          <button
            className="btn btn-primary float-end"
            isActive={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            Add New Agent
          </button>
          {isActive ? <AddAgent /> : ""}{" "}
        </h2>
      </div>
      <hr />

      <div className="row">
        {agentList.agents?.length > 0 &&
          agentList?.agents?.map((agent) => (
            <div key={agent._id} className="col-md-6 my-2">
              <Link
                to={`/leadsBySalesAgent/${agent.name}`}
                className="text-decoration-none"
              >
                <div className="card bg-success-subtle border-0 p-3">
                  <div className="row">
                    <div className="col-md-9 ">
                      {" "}
                      {agent.name}: {agent.email} | Total Leads:{" "}
                      {
                        leads.filter(
                          (lead) => lead.salesAgent?.name === agent.name
                        ).length
                      }
                    </div>
                    <div className="col-md-3 ">
                      {" "}
                      <Link
                        className="btn btn-primary float-end"
                        to={`/leadsBySalesAgent/${agent.name}`}
                       
                      >
                        view more
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SalesAgentListComponent;
