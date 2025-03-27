import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import Filters from "../../components/Filters";
import { fetchLeads, getGroupedLead } from "../../features/leadsSlice";

function Home() {
  const dispatch = useDispatch();
  const {leads, status, error} = useSelector((state) => {
    return state.leads;
  });

  const statusGrouped = useSelector((state) => {
   
    return state.leads.statusGrouped.leadsByStatus;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  useEffect(() => {
    dispatch(getGroupedLead());
  }, []);

  const StatusBy = () => {
   
    if(statusGrouped){
        return  Object.entries(statusGrouped).map(([keys,values]) => {
            return(
              <p key={values}>
                {keys} : {values.length} Leads
              </p>
            )
        })
    }  
}
  return (
    <>
      <LeadHeading />

      <div className="row ">
        <div className="col-md-3">
          <SidebarNav />
        </div>
        <div className="col-md-9 mt-5 pt-5">
          <div className="row">
            {error && <p>{error}</p> }
            {status === "Loading" ? <p>Loading...</p> :           
            
            leads?.length > 0 &&
            leads?.map((lead) => (
                <div className="col-md-4 " key={lead._id}>
                  <Link to={`/leadDetails/${lead._id}`}>
                    <div className="border rounded p-4 m-2 bg-white " >{lead.name}</div>
                  </Link>
                </div>
              ))}
          </div>
          <div className="border rounded p-4 m-2">
            <h4 className="text-center">Lead Status:</h4>
            <hr />  
                 
      <StatusBy />
          </div>
          <Filters />
          <div><Link to="/addLead">Add New Lead</Link></div>
        </div>
      </div>
    </>
  );
}

export default Home;
