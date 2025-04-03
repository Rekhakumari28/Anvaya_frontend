import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeadAsync,
  fetchLeads,
  fetchTags,
  updateLeadAsync,
} from "../../features/leadsSlice";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllSalesAgent } from "../../features/salesAgentSlice";
import { addTagsAsync } from "../../features/tagSlice";
import toast, { Toaster } from "react-hot-toast";

const AddTagComponent = () => {
  const [newTag, setNewTag] = useState("");
  const dispatch = useDispatch();

  const handleSubmitTag = (event) => {
    event.preventDefault();
    console.log(newTag);
    dispatch(addTagsAsync({ name: newTag }));
  };
  return (
    <form onSubmit={handleSubmitTag}>
      <input
        type="text"
        className="form-control"
        placeholder="Add new tag"
        style={{ margin: "6px" }}
        onChange={(event) => setNewTag(event.target.value)}
      />{" "}
      <button
        className="button"
        type="submit"
        style={{ margin: "6px", border: "none" }}
      >
        Add
      </button>
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
const navigate = useNavigate()

  const leadExist =
    leadId && leads && leads.find((lead) => lead._id === leadId.leadId);
  const existing = Boolean(leadExist);
  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAllSalesAgent());
    dispatch(fetchTags());
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


  const handleTag = (event)=>{
    const {checked, value} = event.target;
    if(checked){
      setTag((prevVal)=>[...prevVal, value])
    }else{
      setTag((prevVal)=>prevVal.filter(lead=> lead.tag != value))
    }
  }


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

      toast.success('Lead Added Successfully!')
      setTimeout(()=>{
        window.location.reload()
        navigate("/")
       },2000)

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
      toast.success('Lead Updated Successfully!')
      setTimeout(()=>{
        window.location.reload()
        navigate(`/leadDetails/${leadId.leadId}`)
       },2000)
    }
  };

  return (
    <>
      <LeadHeading />
      <div className="mainContent">
        <div className="rows">
          <div>
            <SidebarNav />
          </div>
          <div className="cols" style={{ width: "1100px" }}>
            <div className="sections">
              <h4 className="content-heading">
                {existing ? "Update Lead Details" : "Add New Lead"}
              </h4>
              <div className="hr-gray">
                <hr />
              </div>
              <form onSubmit={handleSubmitLeadForm}>
                <div className="rows" style={{ marginBottom: "0" }}>
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Lead Name:{" "}
                  </span>{" "}
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Name of the potential customer or company"
                      onChange={(event) => setLeadName(event.target.value)}
                      value={leadName}
                    />
                  </span>
                </div>
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Lead Source:{" "}
                  </span>{" "}
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
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
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Assigned Sales Agent:{" "}
                  </span>{" "}
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
                    {/* { agents && agents.map((agent)=> 
                     <label className="me-5"  key={agent._id}>
                     <input
                       className="form-check-input"
                       type="checkbox"
                       value={agent._id}
                       name="salesAgents"
                       
                       onChange={(event) => setLeadStatus(event.target.value)}
                     />{" "}
                     {agent.name}
                   </label> ) } */}
                   

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
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Lead Status:{" "}
                  </span>
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
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
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Tags:{" "}
                  </span>{" "}
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
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
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Time to Close:{" "}
                  </span>
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
                    <input
                      onChange={(event) => setTimeToClose(event.target.value)}
                      type="Number"
                      className="form-control "
                      value={timeToClose}
                      placeholder=" Estimated time (in days) to close the deal"
                    />
                  </span>
                </div>
                <div className="rows">
                  <span
                    className="cols"
                    style={{ width: "180px ", textAlign: "center" }}
                  >
                    Priority:{" "}
                  </span>{" "}
                  <span
                    className="cols"
                    style={{ width: "700px", margin: "6px" }}
                  >
                   
                    <select
                      className="form-select "
                      onChange={(event) => setPriority(event.target.value)}
                    >
                      <option>Select</option>
                      <option value="High" >High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </span>
                </div>
                <div className="hr-gray">
                  <div className="hr-gray">
                    <hr />
                  </div>
                </div>

                <button
                  className="button"
                  type="submit"
                  style={{ border: "none" }}
                >
                  {existing ? "Update Lead" : "Create Lead"}
                </button>
              </form>
            </div>
            <div className="sections">
              <h4 className="content-heading">Add Tag:</h4>
              <div className="hr-gray">
                <hr />
              </div>
              <AddTagComponent />
            </div>
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLeadForm;
