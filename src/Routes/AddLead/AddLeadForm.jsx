import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeadAsync,
  fetchLeads,
  updateLeadAsync,
} from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { addTagsAsync, fetchTagsAsync } from "../../features/tagSlice";
import toast, { Toaster } from "react-hot-toast";
import MobileSidebar from "../../components/MobileSidebar";

const AddTagComponent = () => {
  const [newTag, setNewTag] = useState("");
  const dispatch = useDispatch();

  const handleSubmitTag = (event) => {
    event.preventDefault();    
    dispatch(addTagsAsync({ name: newTag }));
    toast.success("Tag added")
  };
  return (
    <form onSubmit={handleSubmitTag}>
      <div className="input-group "> 
      <input
        type="text"
        className="form-control"
        placeholder="Add new tag"
      
        onChange={(event) => setNewTag(event.target.value)}
      />{" "}
      <button
        className="btn btn-primary"
        type="submit"
   
      >
        Add
      </button>
      </div>
    </form>
  );
};

function AddLeadForm() {
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgent, setSalesAgent] = useState([]);
  const [leadStatus, setLeadStatus] = useState("");
  const [tag, setTag] = useState([]);
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("");

  const leadId = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.salesAgent);
  const { tags } = useSelector((state) => state.leads);
  const navigate = useNavigate();

  const leadExist =
    leadId && leads && leads.find((lead) => lead._id === leadId.leadId);
  const existing = Boolean(leadExist);
  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAllSalesAgent());
    dispatch(fetchTagsAsync());
  }, []);

  useEffect(() => {
    if (existing) {
      setLeadName(leadExist?.name || "");
      setLeadSource(leadExist?.source || "");
      setSalesAgent(leadExist?.salesAgent?.name || "");
      setLeadStatus(leadExist?.status || "");
      setTag(leadExist?.tag || "");
      setTimeToClose(leadExist?.timeToClose || "");
      setPriority(leadExist?.priority || "");
    }
  }, [existing, leadExist]);

  const handleTag = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setTag((prevVal) => [...prevVal, value]);
    } else {
      setTag((prevVal) => prevVal.filter((lead) => lead.tag != value));
    }
  };

  const handleSubmitLeadForm = (event) => {
    event.preventDefault();

    if (!existing) {
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
      dispatch(addLeadAsync(leadDataObject));

      toast.success("Lead Added Successfully!");
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 2000);
    } else {
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
      dispatch(updateLeadAsync({ leadId: leadId.leadId, leadDataObject }));
      toast.success("Lead Updated Successfully!");
      setTimeout(() => {
        window.location.reload();
        navigate(`/leadDetails/${leadId.leadId}`);
      }, 2000);
    }
  };

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
                <h2>{existing ? "Update Lead Details" : "Add New Lead"}</h2>
              </div>

              <hr />
<div className="bg-success-subtle rounded p-3">
              <form onSubmit={handleSubmitLeadForm}>
                <div className="row mb-2">
                  <span className="col-md-3">Lead Name: </span>{" "}
                  <span className="col-md-9">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Name of the potential customer or company"
                      onChange={(event) => setLeadName(event.target.value)}
                      value={leadName}
                    />
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Lead Source: </span>{" "}
                  <span className="col-md-9">
                    <select
                      name="leadSource"
                      className="form-select "
                      onChange={(event) => setLeadSource(event.target.value)}
                    >
                      <option>Select</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                    </select>
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Assigned Sales Agent: </span>{" "}
                  <span className="col-md-9">
                    <select
                      className="form-select "
                      onChange={(event) => setSalesAgent(event.target.value)}
                    >
                      <option>Select</option>
                      {agents &&
                        agents?.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name}
                          </option>
                        ))}
                    </select>
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Lead Status: </span>
                  <span className="col-md-9">
                    {" "}
                    <select
                      className="form-select "
                      onChange={(event) => setLeadStatus(event.target.value)}
                    >
                      <option>Select</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Tags: </span>{" "}
                  <span className="col-md-9">
                    {tags &&
                      tags.map((tag) => (
                        <label className="form-label  me-3" key={tag._id}>
                          {" "}
                          <input
                            onChange={handleTag}
                            type="checkbox"
                            name="tag"
                            value={tag.name}
                            className="form-check-input"
                          />{" "}
                          {tag.name}
                        </label>
                      ))}
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Time to Close: </span>
                  <span className="col-md-9">
                    <input
                      onChange={(event) => setTimeToClose(event.target.value)}
                      type="Number"
                      className="form-control "
                      value={timeToClose}
                      placeholder=" Estimated time (in days) to close the deal"
                    />
                  </span>
                </div>
                <div className="row mb-2">
                  <span className="col-md-3">Priority: </span>{" "}
                  <span className="col-md-9">
                    <select
                      className="form-select "
                      onChange={(event) => setPriority(event.target.value)}
                    >
                      <option>Select</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </span>
                </div>
                
                <button
                  className="btn btn-primary"
                  type="submit"
                 
                >
                  {existing ? "Update Lead" : "Create Lead"}
                </button>
              </form>
              </div>
            </div>
            <div className="py-2">
              <div className="row">
                <h2 className="mt-2">Add Tag</h2>
              </div>
              <hr />              
              <AddTagComponent />
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLeadForm;
