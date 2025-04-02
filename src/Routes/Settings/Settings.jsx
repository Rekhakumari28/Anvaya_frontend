import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeadAsync, fetchLeads } from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { deleteSalesAgentAsync, fetchAllSalesAgent } from "../../features/salesAgentSlice";


function Settings() {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => {
    return state.leads;
  });
  const { agents } = useSelector((state) => {
    return state.salesAgent;
  });

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAllSalesAgent())
  }, []);

  const handleDeletLead = (leadId) => {
    dispatch(deleteLeadAsync(leadId));

  };

  const handleDeleteAgent = (agentId)=>{
    dispatch(deleteSalesAgentAsync(agentId))
  }
  

  return (
    <>
      <LeadHeading />
      <div className="mainContent">
        <div className="rows">
          <div>
            <SidebarNav />
          </div>
          <div className="cols">
            <div className="sections">
              <h3 className="content-heading">Delete Leads:</h3>
              <div className="hr-gray ">
                <hr />
              </div>
              <div className="rows">
                {status === "Loading" && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {leads &&
                  leads?.length > 0 &&
                  leads.map((lead) => (
                    <div key={lead._id} className="cols col-mds">
                      <div className="cards">
                        <div className="cards-body">
                          <h4 className="marginLead">{lead.name}</h4>
                          <p className="marginLead">
                            Sales Agent: {lead.salesAgent?.name}
                          </p>
                          <p className="marginLead">Status: {lead.status}</p>
                          <button
                            className="button-danger border-0"
                            onClick={() => handleDeletLead(lead._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="sections">
              <h3 className="content-heading">Delete Agents:</h3>
              <div className="hr-gray ">
                <hr />
              </div>
              <div className="rows">
                {status === "Loading" && <p>Loading...</p>}
               
                {agents &&
                  agents?.length > 0 &&
                  agents.map((agent) => (
                    <div key={agent._id} className="cols col-mds">
                      <div className="cards">
                        <div className="cards-body">
                          <h4 className="marginLead">{agent.name}</h4>
                          
                          <button
                            className="button-danger border-0"
                            onClick={() => handleDeleteAgent(agent._id)}
                          >
                            Delete
                          </button>
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

export default Settings;
