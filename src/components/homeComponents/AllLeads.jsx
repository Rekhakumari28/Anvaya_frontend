import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLeads } from "../../features/leadsSlice";

export default function AllLeads() {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => {
    
    return state.leads;
  });
  useEffect(() => {
    dispatch(fetchLeads());
  }, []);
  return (
    <div className="row">
      {error && <p>{error}</p>}
      {status === "Loading" && <p>Loading...</p>}
      {leads &&
        leads?.length > 0 &&
        leads?.map((lead) => (
          <div className="col-md-3 " key={lead._id}>
            <div className="card bg-success-subtle border-0 mb-4">
              <div className="card-body">
                <h5 className="text-black ">{lead.name}</h5>
               
              </div>
              <div className="card-footer"> <Link
                  to={`/leadDetails/${lead._id}`}
                  className="text-decoration-none"
                >
                  View Details
                </Link></div>
            </div>
          </div>
        ))}
       
    </div>
  );
}

export function AddLead() {
  return (
   
      <Link to="/addLead" className="btn btn-primary float-end">
        Add Lead 
      </Link>
    
  );
}
