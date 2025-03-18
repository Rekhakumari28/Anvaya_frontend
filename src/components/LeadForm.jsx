import React, { useState } from "react";

function LeadForm() {
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [tag, setTag] = useState([]);
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("");

  const handleTag = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTag((prevVal) => [...prevVal, value]);
    } else {
      setTag((prevVal) => prevVal.filter((prev) => prev != value));
    }
  };
  const handleSubmitLeadForm = (event) => {
    event.preventDefault();
    const leadDataObject = {
      name: leadName,
      source: leadSource,
      salesAgent: salesAgent,
      status: leadStatus,
      tags: tag,
      timeToClose: timeToClose,
      priority: priority,
    };
    console.log(leadDataObject);
  };

  return (
    <div className="border rounded container mt-4">
      <div className=" p-4 m-2  ">
        <h4 className="text-center">Add New Lead</h4>
        <hr />
        <form onSubmit={handleSubmitLeadForm}>
          <p className="row">
            <span className="col-md-4">Lead Name: </span>{" "}
            <span className="col-md-8">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Name of the potential customer or company"
                onChange={(event) => setLeadName(event.target.value)}
              />
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Lead Source: </span>{" "}
            <span className="col-md-8">
              <select
                name="leadSource"
                className="form-select mb-3"
                onChange={(event) => setLeadSource(event.target.value)}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Assigned Sales Agent: </span>{" "}
            <span className="col-md-8">
              <select
                className="form-select mb-3"
                onChange={(event) => setSalesAgent(event.target.value)}
              >
                <option value="agent1">agent1</option>
                <option value="agent2">agent2</option>
                <option value="agent3">agent3</option>
              </select>
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Lead Status: </span>
            <span className="col-md-8">
              <select
                className="form-select mb-3"
                onChange={(event) => setLeadStatus(event.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Tags: </span>{" "}
            <span className="col-md-8">
              <label className="form-label mb-3 me-3">
                {" "}
                <input
                  onChange={handleTag}
                  type="checkbox"
                  name="tag"
                  value="High Value"
                  className="form-input-checkbox "
                />{" "}
                High Value
              </label>
              <label className="form-label mb-3">
                {" "}
                <input
                  onChange={handleTag}
                  type="checkbox"
                  name="tag"
                   value="Follow-up"
                  className="form-input-checkbox"
                />{" "}
                Follow-up
              </label>
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Time to Close: </span>
            <span className="col-md-8">
              <input
                onChange={(event) => setTimeToClose(event.target.value)}
                type="Number"
                className="form-control mb-3"
                placeholder=" Estimated time (in days) to close the deal"
              />
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Priority: </span>{" "}
            <span className="col-md-8">
              {" "}
              <select
                className="form-select mb-3"
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </span>
          </p>
          <hr />
          <button type="submit">Create Lead</button>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
