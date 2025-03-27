import React, { useEffect, useState } from "react";
import LeadHeading from "../../components/LeadHeading";
import SidebarNav from "../../components/SidebarNav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadsById, fetchLeads } from "../../features/leadsSlice";
import {
  fetchCommentByLeadId,
  postCommentsAsync,
} from "../../features/commentSlice";
import Filters from "../../components/Filters";

function LeadDetailsManagement() {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { leadId } = useParams();

  const leadList = useSelector((state) => state.leads);
  const comments = useSelector((state) => {
    return state.comment;
  });
  console.log(comments);

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
    console.log(commentDataObject);
    dispatch(postCommentsAsync({ leadId, commentDataObject }));
  };

  return (
    <>
      <LeadHeading leadData={leadData} />
      <div className="row ">
        <div className="col-md-3">
          <SidebarNav />
        </div>
        <div className="col-md-9 mt-5 pt-5">
          <div className="border rounded p-4 m-2">
            <h4 className="text-center">Lead Details:</h4>
            <hr />
            {leadList.status === "Loading" ? (
              <p>Loading...</p>
            ) : (
              <>
                <p> Lead Name: {leadData?.name}</p>
                <p> Sales Agent: {leadData?.salesAgent.name}</p>
                <p> Lead Source: {leadData?.source}</p>
                <p> Lead Status: {leadData?.status}</p>
                <p> Time to Close: {leadData?.timeToClose}</p>
                <p> Priority: {leadData?.priority}</p>
                {leadData?.tags && <p> Tags: {leadData?.tags.join(", ")} </p>}
              </>
            )}
            {leadList.error && <p>{leadList.error}</p>}
          </div>
          <div className="border rounded p-4 m-2">
            <Filters />
            <div>
              <Link to={`/addLead/${leadData?._id}`}>Edit Lead Details</Link>
            </div>
          </div>
          <div className="border rounded p-4 m-2">
            <h4 className="text-center">Comments Sections</h4>
            <hr />
            {/* {status === "Loading" && <p>Loading...</p>  } */}
            {comments.comments?.length > 0 ? (
              comments.comments?.map((comment) => (
                <div key={comment._id}>
                  <p>
                    {comment.author.name} - {comment.createdAt}
                  </p>
                  <p>Comment : {comment.commentText}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>There is no comments. Please add new comment.</p>
            )}
            {/* { error && <p>{error}</p>  } */}

            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add new comment"
                className="form-control mb-2"
                onChange={(event) => setNewComment(event.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadDetailsManagement;
