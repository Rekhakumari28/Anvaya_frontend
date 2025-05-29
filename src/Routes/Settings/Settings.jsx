import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeadAsync, fetchLeads } from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { deleteSalesAgentAsync, fetchAllSalesAgent } from "../../features/salesAgentSlice";
import toast, { Toaster } from "react-hot-toast";
import MobileSidebar from "../../components/MobileSidebar";
import { useNavigate } from "react-router-dom";


function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
toast.success('Lead Deleted Successfully!')
setTimeout(() => {
  window.location.reload();
  navigate("/");
}, 2000);
  };

  const handleDeleteAgent = (agentId)=>{
    dispatch(deleteSalesAgentAsync(agentId))
    toast.success('Agent Deleted Successfully!')
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 2000);
  }
  
  const handleLogOut = ()=>{
     localStorage.removeItem("token");
    navigate("/");
  }

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
             
              <div className="row">
                <h2 className="mt-2">Delete Leads   <button
                className="btn btn-danger float-end  mt-2 me-2"
                onClick={handleLogOut}
              >
                Signout
              </button></h2>
              </div>
              <hr />
              <div className="row">
                {status === "Loading" && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {leads &&
                  leads?.length > 0 &&
                  leads.map((lead) => (
                    <div key={lead._id} className="col-md-4">
                      <div className="card bg-success-subtle border-0 p-2 my-2">
                        <div className="row">
                          <div className="col-md-6 fw-bold">{lead.name}</div>
                           <div className="col-md-6">
                          {/* <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#"
                            data-bs-whatever="@mdo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>{" "}
                            Edit
                          </button> */}
                        
                          <button
                            className="btn btn-outline-danger btn-sm float-end"
                            onClick={() => handleDeletLead(lead._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                            delete
                          </button>
                        </div>
                                
                         
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="py-2">
                          <div className="row ">
                <h2 className="mt-2">Delete Agents</h2>
              </div>
                <hr />
              <div className="row">
                {status === "Loading" && <p>Loading...</p>}
               
                {agents &&
                  agents?.length > 0 &&
                  agents.map((agent) => (
                    <div key={agent._id} className="col-md-4">
                      <div className="card bg-success-subtle border-0 p-2 my-2">
                        <div className="row">
                           <div className="col-md-6 fw-bold">{agent.name}</div>
                           <div className="col-md-6">
                          {/* <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#"
                            data-bs-whatever="@mdo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>{" "}
                            Edit
                          </button> */}
                        
                          <button
                            className="btn btn-outline-danger btn-sm float-end"
                            onClick={() => handleDeleteAgent(agent._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                            delete
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Toaster
  position="top-center"
  reverseOrder={false}
/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
