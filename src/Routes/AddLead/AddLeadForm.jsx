import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLeadAsync, fetchLeads, fetchTags, updateLeadAsync } from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { useParams } from "react-router-dom";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";

function AddLeadForm() {
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [tag, setTag] = useState([]);
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("");

  const leadId = useParams()

  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

const {agents} = useSelector((state)=>state.salesAgent)

const {tags} = useSelector((state)=>state.leads)


  const leadExist = leadId && leads && leads.find(lead=> lead._id === leadId.leadId)
  const existing = Boolean(leadExist)

  useEffect(()=>{
dispatch(fetchLeads())
dispatch(fetchAllSalesAgent())
dispatch(fetchTags())
  },[])
  

  useEffect(()=>{
if(existing){
  setLeadName(leadExist.leadName || "")
  setLeadSource(leadExist.leadSource || "")
  setSalesAgent(leadExist.salesAgent || "")
  setLeadStatus(leadExist.leadStatus || "")
  setTag(leadExist.tag || "")
  setTimeToClose(leadExist.timeToClose || "")
  setPriority(leadExist.priority || "")
}
  },[existing, leadExist])

 
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

if(!existing){
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
  dispatch(addLeadAsync(leadDataObject))
}else{
  
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
  dispatch(updateLeadAsync({leadId: leadId.leadId,leadDataObject }))
}   
  };

  return (
    <>
    <LeadHeading/>
    <div className="row">
      <div className="col-md-3">
        <SidebarNav/>
      </div>
      <div className="col-md-9 mt-4 pt-5">
      <div className="border rounded container mt-4">
      <div className=" p-4 m-2  ">
        <h4 className="text-center">{existing ? "Update Lead Details" : "Add New Lead"}</h4>
        <hr />
        <form onSubmit={handleSubmitLeadForm}>
          <p className="row">
            <span className="col-md-4">Lead Name: </span>{" "}
            <span className="col-md-8">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Name of the potential customer or company"
                value={leadName}
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
                <option >Select</option>
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
                <option >Select</option>
                {agents && agents?.map(agent=> <option key={agent._id} value={agent._id}>{agent.name}</option> )}                
                
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
                <option >Select</option>
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
              {tags && tags.map(tag=>
                <label className="form-label mb-3 me-3" key={tag._id}>
                {" "}
                <input
                  onChange={handleTag}
                  type="checkbox"
                  name="tag"
                  value={tag.name}
                  className="form-input-checkbox "
                />{" "}
               {tag.name}
              </label>
             )}
              
              
            </span>
          </p>
          <p className="row">
            <span className="col-md-4">Time to Close: </span>
            <span className="col-md-8">
              <input
                onChange={(event) => setTimeToClose(event.target.value)}
                type="Number"
                className="form-control mb-3"
                value={timeToClose}
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
                <option >Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </span>
          </p>
          <hr />
          
          <button type="submit">{existing ? "Update Lead" : "Create Lead"}</button>
        </form>
      </div>
    </div>
      </div>
    </div>



    </>
    
  );
}

export default AddLeadForm;
