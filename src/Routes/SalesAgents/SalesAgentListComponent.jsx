import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { Link } from "react-router-dom";
import { fetchLeads } from "../../features/leadsSlice";

function SalesAgentListComponent() {

  const dispatch = useDispatch();
  const agentList = useSelector((state) => {
    return state.salesAgent;
  });
  const {leads} = useSelector((state)=>state.leads)

  useEffect(() => {
    dispatch(fetchLeads())
    dispatch(fetchAllSalesAgent());
  }, []);

  return (
    <div className="sections">
      <h3 className="content-heading">Sales Agent List</h3>
      <div className="hr-gray ">
        {" "}
        <hr />
      </div >
      <div className="rows">
        {agentList.agents?.length > 0 &&
          agentList?.agents?.map((agent) => (
            <div key={agent._id} className="cols"  style={{ margin: "0 50px 0 30px" }} >
              <Link to={`/leadsBySalesAgent/${agent.name}`} style={{textDecoration:"none"}}>
           <div className="cards"   style={{
              width: "700px",
              fontSize: "18px",
              padding: "12px 24px 12px 60px",
            }}>
           {agent.name}: {agent.email} | Total Leads: {leads.filter(lead=> lead.salesAgent.name === agent.name).length}
             <Link
                           className="button-primary"
                             to={`/leadsBySalesAgent/${agent.name}`}
                             style={{ textDecoration: "none", width:"20%" , margin: "0 0 0 60px"}}
                           >
                             view more
                           </Link>
           </div>
           </Link>
            </div>
          ))}
      </div>
      
    </div>
  );
}

export default SalesAgentListComponent;
