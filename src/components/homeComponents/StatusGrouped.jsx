import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroupedLead } from "../../features/leadsSlice";

export const StatusGrouped = () => {
  const dispatch = useDispatch();
  const statusGrouped = useSelector((state) => {
    return state.leads.statusGrouped?.leadsByStatus;
  });
  useEffect(() => {
    dispatch(getGroupedLead());
  }, []);
  return (
    <div className="row">
      {statusGrouped &&
        Object.entries(statusGrouped).map(([keys, values], index) => (
          <div key={index} className="col-md-4 p-2">
            <div className="card border-0 bg-success-subtle">
              <div className="card-body">
                <strong> {keys}</strong> : {values.length} Leads   <Link className="text-decoration-none float-end " to={`/leadsByStatus/${keys}`} >View Details {">"} </Link>
              </div>              
            </div>
          </div>
        ))}
    </div>
  );
};
