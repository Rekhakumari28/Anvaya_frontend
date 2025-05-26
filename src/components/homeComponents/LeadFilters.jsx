import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadsByQuery } from "../../features/filterSlice";
import { Link } from "react-router-dom";

export default function LeadFilters() {
  const [filteredValue, setFilterdValue] = useState("");
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => {
    return state.filters;
  });

  useEffect(() => {
    dispatch(fetchLeadsByQuery());
  }, []);

  const handleFilterChange = (key, value) => {
    setFilterdValue(value);
    const params = new URLSearchParams({ [key]: value });
    dispatch(fetchLeadsByQuery(params.toString()));
  };

  
  return (
 
<div className="container py-2">
       
   
      <div className=" rounded-top py-2">
         <h3>Filters</h3>
         <hr />
      </div>
      <div className="row " style={{overflow:"auto"}}>
       <table className="table  " >
         
          <thead >
            <tr>
              <th className=" bg-success-subtle rounded-start" scope="table">
                {" "}
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
              </th>
              <th className=" bg-success-subtle" scope="table">
                {" "}
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
                </label>
              </th>
              <th className=" bg-success-subtle" scope="table">
                {" "}
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
                </label>
              </th>
              <th className=" bg-success-subtle" scope="table">
                {" "}
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
                </label>
              </th>
              <th className=" bg-success-subtle" scope="table">
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
                </label>
              </th>
              <th className=" bg-success-subtle rounded-end" scope="table">
                {" "}
                <button
                  className="btn btn-secondary"
                  onClick={() => handleFilterChange("status", "")}
                >
                  Reset
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider border rounded">
            {filters && filters?.length > 0 ? (
              filters?.map((lead) => (
                <tr key={lead._id}>
                  <th scope="row" >
                    <span>{lead.name}</span>
                  </th>
                  <td>
                    {" "}
                    <span>{lead.status}</span>
                  </td>
                  <td>
                    {" "}
                    <span>
                      {lead.salesAgent.name} ({lead.salesAgent.email})
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span>{lead.source}</span>
                  </td>
                  <td>
                    {" "}
                    <span>{lead.priority}</span>
                  </td>
                  <td>
                    {" "}
                    <span>{lead.tags.join(", ")}</span>{" "}
                  </td>{" "}
                </tr>
              ))
            ) : (
              <tr > 
              <th className="ms-2 mb-2">Select status</th>
              </tr>
            )}
          </tbody>
        </table>
</div>
    </div>
  );
}
