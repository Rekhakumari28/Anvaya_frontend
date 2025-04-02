import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../features/leadsSlice";

import {
  fetchCommentByLeadId,
  postCommentsAsync,
} from "../../features/commentSlice"; 

function LeadDetailsManagement() {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { leadId } = useParams();

  const leadList = useSelector((state) => state.leads);
  const {comments, status, error} = useSelector((state) => {
    return state.comment;
  });
  

  useEffect(() => {
    dispatch(fetchCommentByLeadId(leadId));
  }, []);

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  const leadData = leadList.leads?.find((lead) => lead._id == leadId);
 

  const handleAddComment = (event) => {
    event.preventDefault()
    const commentDataObject = {
      lead: leadId,
      commentText: String(newComment),
      author: leadData?.salesAgent?._id,
    };
      dispatch(postCommentsAsync({ leadId, commentDataObject }));
  };

  return (
    <>
      <LeadHeading leadData={leadData} />
      <div className="mainContent" > 
      <div className="rows ">
        <div>
          <SidebarNav />
        </div>
        <div className="cols  " style={{width:"100%"}}>
          <div className="sections" >
            <h4 className="content-heading">Lead Details:</h4>
            <div className="hr-gray "> <hr /></div>
           <div className="rows" >
            {leadList.status === "Loading" ? (
              <p>Loading...</p>
            ) : (
              <div className="cols" style={{margin:"0 50px 0 170px"}}>
                <div className="cards" style={{width: "500px" , fontSize: "18px", padding:"12px 24px 12px 60px" }}>
<div className="cards-body"> 
                <p > Lead Name: {leadData?.name}</p>
                
                <p> Sales Agent: {leadData?.salesAgent.name}</p>
                <p> Lead Source: {leadData?.source}</p>
                <p> Lead Status: {leadData?.status}</p>
                <p> Time to Close: {leadData?.timeToClose}</p>
                <p> Priority: {leadData?.priority}</p>
                {leadData?.tags && <p> Tags: {leadData?.tags.join(", ")} </p>}
                </div></div>
              </div>
            )}
            {leadList.error && <p>{leadList.error}</p>}
            </div>
          </div>
         
          <div className="sections">
            <div style={{ textAlign: "center", paddingTop:"24px"}}>
              <Link to={`/addLead/${leadData?._id}`} className="button">Edit Lead Details</Link>
            </div>
          </div>
          <div className="sections">
            <h4 className="content-heading">Comments Sections</h4>
            <div className="hr-gray "> <hr /></div>
            <div >
            {status === "Loading" && <p>Loading...</p>  }
            {comments.comments?.length > 0 ? (
              comments.comments?.map((comment) => (
                <div key={comment._id} className="cards" style={{width:"100%" , margin:"12px 0"}}>
                <div key={comment._id} className="cards-body">
                  <p>
                    {comment.author.name} - {comment.createdAt}
                  </p>
                  <p>Comment : {comment.commentText}</p>                 
                </div>
                </div>
              ))
            ) : (
              <p>There is no comments. Please add new comment.</p>
            )}
            { error && <p>{error}</p>  }
            </div>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add new comment"
                className="form-control mb-2"
                onChange={(event) => setNewComment(event.target.value)}
              />
              <button type="submit" className="button" style={{border: "none"}}>Submit</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default LeadDetailsManagement;
