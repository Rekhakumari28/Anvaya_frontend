import React, { useEffect, useState } from "react";
import { addSalesAgentAsync } from "../../features/salesAgentSlice";
import { useDispatch } from "react-redux";

function AddAgent() {
  const [agentName, setAgentName] = useState("");
  const [email, setEmail] = useState("");

const dispatch = useDispatch()  

  const handleSubmitAgentForm = (event) => {
    event.preventDefault();
    const atIndex = email.indexOf("@");
    const dotIndex = email.indexOf(".");
    const agentData = {
      name: agentName,
      email: email,
    };
    if (dotIndex > atIndex && atIndex > 0) {
      dispatch(addSalesAgentAsync(agentData));
      console.log(agentData)
    } else {
      console.log("Email is not valid");
    }
  };  

  return (
    <div className="border rounded container mt-4">
      <div className="p-4 m-2 ">
        <h4>Add New Sales Agent</h4>
        <hr />
        <form onSubmit={handleSubmitAgentForm}>
          <p className="row">
            <span className="col-md-3">Agent Name:</span>
            <span className="col-md-9">
              <input
                type="text"
                placeholder="Agent name"
                className="form-control"
                onChange={(event) => setAgentName(event.target.value)}
              />
            </span>
          </p>
          <p className="row">
            <span className="col-md-3">Email Address:</span>
            <span className="col-md-9">
              <input
                type="text"
                placeholder="Email Address"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </p>
          <hr />
          <button type="submit">Create Agent</button>
        </form>
      </div>
    </div>
  );
}

export default AddAgent;
