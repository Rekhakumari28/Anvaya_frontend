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
    <div className="my-2 border rounded bg-success-subtle">
      <div className="p-4 m-2 ">
        <h3 className="content-heading" >Add Sales Agent</h3>
        <div className="hr-gray ">
        {" "}
        <hr />
      </div>
        <form onSubmit={handleSubmitAgentForm}>
          <p className="row">
            <span className="col-md-3 fw-normal fs-5">Agent Name</span>
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
            <span className="col-md-3  fw-normal fs-5">Email Address</span>
            <span className="col-md-9">
              <input
                type="text"
                placeholder="Email Address"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </p>
          <div className="row"> <div className="col-md-12"><button type="submit" className="btn btn-primary float-end" >Create Agent</button></div></div>
          
        </form>
      </div>
    </div>
  );
}

export default AddAgent;
